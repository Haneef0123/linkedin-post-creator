// This implementation is adapted from hello-gpt-app-router reference but using Google Gemini API
// Key differences: Uses Gemini API instead of OpenAI, POST instead of GET, LinkedIn-specific prompts
export const dynamic = "force-dynamic";

import { GeminiApiService } from "@/services/gemini-api.service";
import { API_ERRORS, HTTP_STATUS } from "@/constants/api-constants";

// Logic for the `/api/generate-post` endpoint - adapted for Google Gemini API
// Now using centralized service while maintaining exact original functionality
export async function POST(request: Request) {
  try {
    // Get request body for LinkedIn post parameters - original validation logic
    const {
      topic,
      tone = "professional",
      length = "short", // Changed default from "medium" to "short"
      includeHashtags = true,
      includeEmojis = false,
      targetAudience = "professionals",
    } = await request.json();

    // Original validation logic from route.ts - preserving exact error messages
    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: { message: API_ERRORS.INVALID_REQUEST } }),
        {
          status: HTTP_STATUS.BAD_REQUEST,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Use new service but maintain all original logic
    const geminiService = new GeminiApiService();
    const result = await geminiService.generatePostDirect({
      topic,
      tone,
      length,
      includeHashtags,
      includeEmojis,
      targetAudience,
    });

    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: result.error?.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Original successful response format from route.ts - maintaining exact structure
    return new Response(JSON.stringify(result.data), {
      status: HTTP_STATUS.OK,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    // Original error handling - same pattern as hello-gpt-app-router reference
    const errorInstance =
      error instanceof Error ? error : new Error("Unknown error occurred");
    return new Response(
      JSON.stringify({ error: { message: API_ERRORS.UNKNOWN_ERROR } }),
      {
        status:
          errorInstance && "statusCode" in errorInstance
            ? (errorInstance as Error & { statusCode: number }).statusCode ||
              HTTP_STATUS.INTERNAL_SERVER_ERROR
            : HTTP_STATUS.INTERNAL_SERVER_ERROR,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
