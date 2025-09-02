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
      params
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
    const promptText = await createViralLinkedInPrompt({
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
}
