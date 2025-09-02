// Gemini API Service - Extracted from route.ts logic while preserving all original functionality
import { API_CONFIG } from "@/config/api";
import { API_ERRORS, HTTP_STATUS } from "@/constants/api-constants";
import { ApiClient } from "./api-client";
import { createViralLinkedInPrompt } from "@/lib/utils";
import {
  ApiResponse,
  GeminiGenerateRequest,
  GeminiGenerateResponse,
  GeminiResponseBody,
  GeminiGroundingRequest,
} from "@/types/api.types";

export class GeminiApiService {
  private apiClient = ApiClient.getInstance();

  // Internal API call - maintains original hook logic
  async generatePost(
    params: GeminiGenerateRequest
  ): Promise<ApiResponse<GeminiGenerateResponse>> {
    const endpoint = API_CONFIG.INTERNAL.ENDPOINTS.GENERATE_POST;

    const result = await this.apiClient.post<GeminiGenerateResponse>(
      endpoint,
      params // Pass all parameters including enableWebSearch
    );

    // Transform response to maintain original format from hooks
    if (result.success && result.data) {
      return {
        success: true,
        data: result.data,
      };
    }

    return {
      success: false,
      error: result.error || {
        message: API_ERRORS.UNKNOWN_ERROR,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      },
    };
  }

  // Direct Gemini API call - maintains ALL original route.ts logic
  async generatePostDirect(
    params: GeminiGenerateRequest
  ): Promise<ApiResponse<GeminiGenerateResponse>> {
    // Original API key check from route.ts
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error: {
          message: API_ERRORS.MISSING_API_KEY,
          code: "MISSING_API_KEY",
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        },
      };
    }

    // Original endpoint construction from route.ts
    const endpoint = API_CONFIG.GEMINI.ENDPOINTS.GENERATE_CONTENT(apiKey);

    // Validate and ensure correct types for prompt generation
    const validLength =
      params.length === "short" ||
      params.length === "medium" ||
      params.length === "long"
        ? params.length
        : "medium";

    // Original prompt building logic from route.ts - maintaining exact function call
    const promptText = createViralLinkedInPrompt({
      topic: params.topic,
      tone: params.tone,
      length: validLength,
      targetAudience: params.targetAudience,
      includeEmojis: params.includeEmojis,
      includeHashtags: params.includeHashtags,
    });

    // Original request body structure from route.ts - preserving exact format
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: promptText,
            },
          ],
        },
      ],
      generationConfig: API_CONFIG.GEMINI.DEFAULT_CONFIG,
    };

    const result = await this.apiClient.post<GeminiResponseBody>(
      endpoint,
      requestBody
    );

    if (!result.success) {
      // Original quota error handling from route.ts
      if (result.error?.code === "RESOURCE_EXHAUSTED") {
        return {
          success: false,
          error: {
            message: API_ERRORS.QUOTA_EXCEEDED,
            statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
            code: "QUOTA_EXCEEDED",
          },
        };
      }

      return {
        success: false,
        error: result.error || {
          message: API_ERRORS.UNSUCCESSFUL_REQUEST,
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        },
      };
    }

    // Original content extraction logic from route.ts - maintaining exact format
    const responseBody = result.data as GeminiResponseBody;
    const completionText =
      responseBody.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      API_ERRORS.UNABLE_TO_GENERATE;

    return {
      success: true,
      data: {
        success: true,
        content: completionText,
      },
    };
  }

  // Enhanced version with optional web search
  async generatePostDirectWithSearch(
    params: GeminiGenerateRequest & { enableWebSearch?: boolean }
  ): Promise<ApiResponse<GeminiGenerateResponse>> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error: {
          message: API_ERRORS.MISSING_API_KEY,
          code: "MISSING_API_KEY",
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        },
      };
    }

    const endpoint = API_CONFIG.GEMINI.ENDPOINTS.GENERATE_CONTENT(apiKey);

    const validLength =
      params.length === "short" ||
      params.length === "medium" ||
      params.length === "long"
        ? params.length
        : "medium";

    // Enhanced prompt that tells Gemini when to search
    const promptText = this.createSearchEnabledPrompt({
      topic: params.topic,
      tone: params.tone,
      length: validLength,
      targetAudience: params.targetAudience,
      includeEmojis: params.includeEmojis,
      includeHashtags: params.includeHashtags,
      enableWebSearch: params.enableWebSearch,
    });

    // Enhanced request body with grounding
    const requestBody: any = {
      contents: [
        {
          parts: [
            {
              text: promptText,
            },
          ],
        },
      ],
      generationConfig: API_CONFIG.GEMINI.DEFAULT_CONFIG,
    };

    // Add grounding for web search if enabled
    if (params.enableWebSearch) {
      requestBody.tools = [
        {
          googleSearchRetrieval: API_CONFIG.GEMINI.GROUNDING_CONFIG.googleSearchRetrieval,
        },
      ];
    }

    const result = await this.apiClient.post<GeminiResponseBody>(
      endpoint,
      requestBody
    );

    if (!result.success) {
      if (result.error?.code === "RESOURCE_EXHAUSTED") {
        return {
          success: false,
          error: {
            message: API_ERRORS.QUOTA_EXCEEDED,
            statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
            code: "QUOTA_EXCEEDED",
          },
        };
      }

      return {
        success: false,
        error: result.error || {
          message: API_ERRORS.UNSUCCESSFUL_REQUEST,
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        },
      };
    }

    const responseBody = result.data as GeminiResponseBody;
    const completionText =
      responseBody.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      API_ERRORS.UNABLE_TO_GENERATE;

    return {
      success: true,
      data: {
        success: true,
        content: completionText,
        // Include grounding metadata if available
        groundingMetadata: responseBody.candidates?.[0]?.groundingMetadata,
      },
    };
  }

  // Helper method to create search-enabled prompts
  private createSearchEnabledPrompt(params: {
    topic: string;
    tone?: string;
    length: string;
    targetAudience?: string;
    includeEmojis?: boolean;
    includeHashtags?: boolean;
    enableWebSearch?: boolean;
  }): string {
    const searchInstruction = params.enableWebSearch
      ? "Before creating the post, search for the latest information, trends, statistics, and recent developments related to this topic. Use current data to make the post more relevant and engaging."
      : "";

    return `${searchInstruction}

Create a viral LinkedIn post about "${params.topic}" with the following requirements:
- Tone: ${params.tone || "professional"}
- Length: ${params.length}
- Target audience: ${params.targetAudience || "professionals"}
- Include emojis: ${params.includeEmojis || false}
- Include hashtags: ${params.includeHashtags || true}

Make the post engaging, professional, and optimized for LinkedIn engagement.`;
  }
}
