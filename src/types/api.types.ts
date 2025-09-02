// API Types - Based on official Gemini API documentation and maintaining original interfaces

// HTTP Request/Response types
export interface HttpResponse {
  status: number;
  ok: boolean;
  json: () => Promise<unknown>;
}

export interface HttpRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

// Gemini API Types - Based on official Google Gemini API documentation
export interface GeminiError {
  code: string;
  message: string;
}

export interface GeminiContentPart {
  text: string;
}

export interface GeminiContent {
  parts: GeminiContentPart[];
}

// Grounding types for web search functionality
export interface GeminiGroundingMetadata {
  groundingChunks?: Array<{
    web?: {
      uri: string;
      title: string;
    };
  }>;
  webSearchQueries?: string[];
}

export interface GeminiCandidate {
  content: GeminiContent;
  finishReason?: string;
  safetyRatings?: Array<{
    category: string;
    probability: string;
    blocked?: boolean;
  }>;
  tokenCount?: number;
  groundingMetadata?: GeminiGroundingMetadata;
}

export interface GeminiGenerationConfig {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
  stopSequences?: string[];
  candidateCount?: number;
}

export interface GeminiRequestBody {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig?: GeminiGenerationConfig;
  safetySettings?: Array<{
    category: string;
    threshold: string;
  }>;
}

export interface GeminiResponseBody {
  candidates?: GeminiCandidate[];
  error?: GeminiError;
  promptFeedback?: {
    blockReason?: string;
    safetyRatings?: Array<{
      category: string;
      probability: string;
    }>;
  };
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
}

// LinkedIn Post Generator Types - maintaining structure from hooks
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
  enableWebSearch?: boolean;
  [key: string]: SerializableData | undefined;
}

export interface GeminiGroundingRequest extends GeminiGenerateRequest {
  enableWebSearch?: boolean;
}

export interface GeminiGenerateResponse {
  success: boolean;
  content: string;
  groundingMetadata?: GeminiGroundingMetadata;
}

// API Error interface
export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

// Standard API response wrapper - maintaining original response format with proper typing
export interface ApiResponse<T = GeminiGenerateResponse> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

// Type for JSON parsing results that could be any valid JSON value
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue | undefined };

// Type for data that can be JSON serialized
export type SerializableData =
  | string
  | number
  | boolean
  | null
  | SerializableData[]
  | { [key: string]: SerializableData | undefined };

// Type for error responses from APIs
export interface ErrorResponseData {
  error?: {
    message?: string;
    code?: string;
  };
  [key: string]: JsonValue | undefined;
}

// Type for successful API responses that contain content
export interface ContentResponseData {
  content?: string;
  success?: boolean;
  [key: string]: JsonValue | undefined;
}
