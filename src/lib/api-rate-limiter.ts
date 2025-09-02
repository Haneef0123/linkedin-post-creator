// Production-ready API Rate Limiter using proven libraries
import Bottleneck from 'bottleneck';
import pRetry from 'p-retry';

export interface ApiLimiterConfig {
  maxConcurrent?: number;
  minTime?: number;
  reservoir?: number;
  reservoirRefreshAmount?: number;
  reservoirRefreshInterval?: number;
  retryAttempts?: number;
  retryMinTimeout?: number;
  retryMaxTimeout?: number;
  retryFactor?: number;
}

export interface ApiLimiterStatus {
  running: number;
  queued: number;
  submitted: number;
  done: number;
  failed: number;
}

export class ApiRateLimiter {
  private limiter: Bottleneck;
  private retryConfig: {
    retries: number;
    minTimeout: number;
    maxTimeout: number;
    factor: number;
    randomize: boolean;
  };
  private originalConfig: ApiLimiterConfig;

  constructor(config: ApiLimiterConfig = {}) {
    this.originalConfig = config;
    
    // Default configuration for conservative API usage
    this.limiter = new Bottleneck({
      maxConcurrent: config.maxConcurrent ?? 1,
      minTime: config.minTime ?? 1000, // 1 second between requests
      reservoir: config.reservoir ?? 60, // 60 requests
      reservoirRefreshAmount: config.reservoirRefreshAmount ?? 60,
      reservoirRefreshInterval: config.reservoirRefreshInterval ?? 60 * 1000, // per minute
    });

    this.retryConfig = {
      retries: config.retryAttempts ?? 3,
      minTimeout: config.retryMinTimeout ?? 1000,
      maxTimeout: config.retryMaxTimeout ?? 10000,
      factor: config.retryFactor ?? 2,
      randomize: true,
    };

    // Set up event listeners for monitoring
    this.setupEventListeners();
  }

  /**
   * Execute a function with rate limiting and retry logic
   */
  async execute<T>(
    fn: () => Promise<T>,
    options?: {
      priority?: number;
      weight?: number;
      skipRetry?: boolean;
    }
  ): Promise<T> {
    const executeWithRetry = options?.skipRetry ? fn : () => pRetry(fn, {
      ...this.retryConfig,
      onFailedAttempt: (error) => {
        const originalError = error as unknown as Error & { statusCode?: number };
        const errorMessage = originalError.message || String(error);
        console.warn(`API call attempt ${error.attemptNumber} failed:`, errorMessage);
        
        // Don't retry client errors (4xx)
        if (error.retriesLeft === 0 || this.isClientError(originalError)) {
          throw error;
        }
      },
    });

    return this.limiter.schedule(
      {
        priority: options?.priority ?? 5,
        weight: options?.weight ?? 1,
      },
      executeWithRetry
    );
  }

  /**
   * Get current limiter status
   */
  async getStatus(): Promise<ApiLimiterStatus> {
    const [running, done] = await Promise.all([
      this.limiter.running(),
      this.limiter.done()
    ]);
    
    return {
      running,
      queued: this.limiter.queued(),
      submitted: running + this.limiter.queued(), // Approximate
      done,
      failed: 0, // Bottleneck doesn't track failed jobs directly
    };
  }

  /**
   * Get detailed metrics
   */
  async getMetrics() {
    const status = await this.getStatus();
    return {
      status,
      queued: this.limiter.queued(),
      // Note: Some properties are not exposed by Bottleneck
      info: 'Detailed reservoir and timing info not available via Bottleneck API'
    };
  }

  /**
   * Clear the queue
   */
  clearQueue(): void {
    this.limiter.stop({ dropWaitingJobs: true });
    // Recreate the limiter to restart it cleanly
    this.limiter = new Bottleneck({
      maxConcurrent: this.originalConfig.maxConcurrent ?? 1,
      minTime: this.originalConfig.minTime ?? 1000,
      reservoir: this.originalConfig.reservoir ?? 60,
      reservoirRefreshAmount: this.originalConfig.reservoirRefreshAmount ?? 60,
      reservoirRefreshInterval: this.originalConfig.reservoirRefreshInterval ?? 60 * 1000,
    });
    this.setupEventListeners();
  }

  /**
   * Stop the limiter
   */
  async stop(): Promise<void> {
    await this.limiter.stop();
  }

  /**
   * Check if error is a client error (4xx) that shouldn't be retried
   */
  private isClientError(error: Error & { statusCode?: number; status?: number }): boolean {
    const statusCode = error.statusCode || error.status;
    return statusCode !== undefined && statusCode >= 400 && statusCode < 500 && statusCode !== 429; // Don't retry 4xx except 429
  }

  /**
   * Set up event listeners for monitoring
   */
  private setupEventListeners(): void {
    this.limiter.on('error', (error) => {
      console.error('Rate limiter error:', error);
    });

    this.limiter.on('failed', (error, info) => {
      console.warn('Job failed:', error.message, 'Info:', info);
    });

    this.limiter.on('retry', (error, info) => {
      const errorMessage = typeof error === 'string' ? error : (error as Error)?.message || String(error);
      console.info('Job retrying:', errorMessage, 'Info:', info);
    });

    // Optional: Log when queue gets too long
    this.limiter.on('queued', () => {
      const queued = this.limiter.queued();
      if (queued > 10) {
        console.warn(`Large queue detected: ${queued} jobs queued`);
      }
    });
  }
}

/**
 * Predefined configurations for different API usage patterns
 */
export const API_LIMITER_PRESETS = {
  // Conservative: For free API tiers
  CONSERVATIVE: {
    maxConcurrent: 1,
    minTime: 1000, // 1 second between requests
    reservoir: 10, // 10 requests per minute
    reservoirRefreshAmount: 10,
    reservoirRefreshInterval: 60 * 1000,
    retryAttempts: 3,
    retryMinTimeout: 1000,
    retryMaxTimeout: 10000,
    retryFactor: 2,
  },

  // Moderate: For paid API tiers
  MODERATE: {
    maxConcurrent: 3,
    minTime: 500, // 0.5 seconds between requests
    reservoir: 60, // 60 requests per minute
    reservoirRefreshAmount: 60,
    reservoirRefreshInterval: 60 * 1000,
    retryAttempts: 3,
    retryMinTimeout: 500,
    retryMaxTimeout: 5000,
    retryFactor: 2,
  },

  // Aggressive: For high-tier APIs
  AGGRESSIVE: {
    maxConcurrent: 10,
    minTime: 100, // 0.1 seconds between requests
    reservoir: 1000, // 1000 requests per minute
    reservoirRefreshAmount: 1000,
    reservoirRefreshInterval: 60 * 1000,
    retryAttempts: 2,
    retryMinTimeout: 200,
    retryMaxTimeout: 2000,
    retryFactor: 2,
  },
} as const;
