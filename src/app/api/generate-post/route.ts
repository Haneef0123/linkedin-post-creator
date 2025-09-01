// This implementation is adapted from hello-gpt-app-router reference but using Google Gemini API
// Key differences: Uses Gemini API instead of OpenAI, POST instead of GET, LinkedIn-specific prompts
export const dynamic = "force-dynamic";

import { createViralLinkedInPrompt } from "@/lib/utils";

interface FetchLikeResponse {
  status: number;
  ok: boolean;
  json: () => Promise<unknown>;
}

interface GeminiError {
  code: string;
  message: string;
}

interface GeminiResponseBody {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
  error?: GeminiError;
}

// Logic for the `/api/generate-post` endpoint - adapted for Google Gemini API
export async function POST(request: Request) {
  try {
    // Get request body for LinkedIn post parameters
    const {
      topic,
      tone = "professional",
      length = "medium",
      includeHashtags = true,
      includeEmojis = false,
      targetAudience = "professionals",
    } = await request.json();

    // Validate input
    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: { message: "Topic is required" } }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: { message: "Gemini API key is not configured" },
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Setting parameters for Google Gemini API request
    const geminiEndpointURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    // Build prompt for LinkedIn post generation using utility function
    const promptText = createViralLinkedInPrompt({
      topic,
      tone,
      length,
      targetAudience,
      includeEmojis,
      includeHashtags,
    });

    const geminiRequestBody = {
      contents: [
        {
          parts: [
            {
              text: promptText,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 300,
      },
    };

    // Sending our request using the Fetch API - same pattern as hello-gpt-app-router
    let geminiResponse: FetchLikeResponse;
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(geminiRequestBody),
      };

      geminiResponse = await fetch(geminiEndpointURL, fetchOptions);
    } catch (fetchError: unknown) {
      // If it's an SSL certificate error, try with a different approach
      if (
        fetchError instanceof Error &&
        fetchError.cause instanceof Error &&
        "code" in fetchError.cause &&
        fetchError.cause.code === "SELF_SIGNED_CERT_IN_CHAIN"
      ) {
        // Use dynamic import to avoid issues with Node.js modules in Edge runtime
        try {
          // For development/testing, we'll use an alternative approach
          const https = await import("https");
          const { URL } = await import("url");

          // Create agent that ignores SSL issues (development only)
          const agent = new https.Agent({
            rejectUnauthorized: false,
          });

          // Use node-fetch-like approach with custom agent
          const url = new URL(geminiEndpointURL);
          const requestData = JSON.stringify(geminiRequestBody);

          const response = await new Promise((resolve, reject) => {
            const req = https.request(
              {
                hostname: url.hostname,
                port: url.port || 443,
                path: url.pathname + url.search, // Include query parameters for API key
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Content-Length": Buffer.byteLength(requestData),
                },
                agent: agent,
              },
              (res) => {
                let data = "";
                res.on("data", (chunk) => (data += chunk));
                res.on("end", () => {
                  try {
                    const jsonData = JSON.parse(data);
                    resolve({
                      status: res.statusCode || 500,
                      ok:
                        (res.statusCode || 500) >= 200 &&
                        (res.statusCode || 500) < 300,
                      json: () => Promise.resolve(jsonData),
                    });
                  } catch {
                    reject(new Error("Failed to parse response JSON"));
                  }
                });
              }
            );

            req.on("error", reject);
            req.write(requestData);
            req.end();
          });

          geminiResponse = response as FetchLikeResponse;
        } catch {
          const errorMessage =
            fetchError instanceof Error
              ? fetchError.message
              : "Unknown network error";
          throw new Error(`Network request failed: ${errorMessage}`);
        }
      } else {
        const errorMessage =
          fetchError instanceof Error
            ? fetchError.message
            : "Unknown network error";
        throw new Error(`Network request failed: ${errorMessage}`);
      }
    }

    // Processing the response body
    const geminiResponseBody =
      (await geminiResponse.json()) as GeminiResponseBody;

    // Error handling for the Gemini endpoint - same pattern as reference
    if (geminiResponse.status !== 200) {
      const error = new Error(
        "Gemini API request was unsuccessful."
      ) as Error & {
        statusCode: number;
        body: GeminiResponseBody;
      };
      error.statusCode = geminiResponse.status;
      error.body = geminiResponseBody;

      // Handle quota exceeded error
      if (geminiResponseBody?.error?.code === "RESOURCE_EXHAUSTED") {
        return new Response(
          JSON.stringify({
            error: {
              message:
                "Gemini API quota exceeded. Please check your usage at https://console.cloud.google.com/",
            },
          }),
          {
            status: 429, // Too Many Requests
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      throw error;
    }

    // Extract the generated content from Gemini response
    const completionText =
      geminiResponseBody.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Unable to generate content";

    // Sending a successful response for our endpoint - same format as reference
    return new Response(
      JSON.stringify({
        success: true,
        content: completionText,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    // Error handling - same pattern as hello-gpt-app-router reference

    // Sending an unsuccessful response for our endpoint
    return new Response(
      JSON.stringify({ error: { message: "An error has occurred" } }),
      {
        status:
          error instanceof Error && "statusCode" in error
            ? (error as Error & { statusCode: number }).statusCode || 500
            : 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
