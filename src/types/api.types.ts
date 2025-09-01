// API Types - Maintaining original interfaces from route.ts and hooks

// Original interfaces from route.ts - preserving exact structure
export interface FetchLikeResponse {
  status: number;
  ok: boolean;
  json: () => Promise<unknown>;
}

export interface GeminiError {
  code: string;
  message: string;
}

export interface GeminiResponseBody {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
  error?: GeminiError;
}

// Original request/response types - maintaining structure from hooks
export interface PostGeneratorOptions {
  tone?: "professional" | "casual" | "inspirational" | "educational";
  length?: "short" | "medium" | "long";
  includeHashtags?: boolean;
  includeEmojis?: boolean;
  targetAudience?: string;
}

export interface GeminiGenerateRequest {
  topic: string;
  tone?: string;
  length?: string;
  includeHashtags?: boolean;
  includeEmojis?: boolean;
  targetAudience?: string;
}

export interface GeminiGenerateResponse {
  success: boolean;
  content: string;
}

// Standard API response wrapper - maintaining original response format
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    statusCode?: number;
  };
}
