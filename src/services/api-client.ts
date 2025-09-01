// API Client Service - Extracted from original route.ts logic while maintaining exact functionality
import { API_ERRORS, HTTP_STATUS } from "@/constants/api-constants";
import {
  ApiResponse,
  HttpResponse,
  JsonValue,
  SerializableData,
  ErrorResponseData,
} from "@/types/api.types";

export class ApiClient {
  private static instance: ApiClient;

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Original fetch logic from route.ts - maintaining exact error handling and SSL workarounds
  private async makeRequest<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      let response: HttpResponse;

      // Original fetch attempt logic from route.ts
      try {
        const fetchOptions = {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        };

        const fetchResponse = await fetch(url, fetchOptions);
        response = {
          status: fetchResponse.status,
          ok: fetchResponse.ok,
          json: () => fetchResponse.json(),
        };
      } catch (fetchError: unknown) {
        // Original SSL certificate error handling from route.ts - preserving exact logic
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
            const requestUrl = new URL(url);
            const requestData = (options.body as string) || "";

            const httpsResponse = await new Promise((resolve, reject) => {
              const baseHeaders = {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(requestData),
              };

              // Merge headers safely
              const mergedHeaders = { ...baseHeaders };
              if (
                options.headers &&
                typeof options.headers === "object" &&
                !Array.isArray(options.headers)
              ) {
                Object.assign(mergedHeaders, options.headers);
              }

              const req = https.request(
                {
                  hostname: requestUrl.hostname,
                  port: parseInt(requestUrl.port || "443"),
                  path: requestUrl.pathname + requestUrl.search,
                  method: options.method || "GET",
                  headers: mergedHeaders,
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
              if (requestData) {
                req.write(requestData);
              }
              req.end();
            });

            response = httpsResponse as HttpResponse;
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

      const jsonData = await response.json();
      const data = jsonData as JsonValue;

      // Original error handling logic from route.ts
      if (!response.ok) {
        const errorData = data as ErrorResponseData;
        return {
          success: false,
          error: {
            message: errorData.error?.message || API_ERRORS.UNKNOWN_ERROR,
            statusCode: response.status,
            code: errorData.error?.code,
          },
        };
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : API_ERRORS.UNKNOWN_ERROR,
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        },
      };
    }
  }

  async post<T>(url: string, data: SerializableData): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(url, {
      method: "GET",
    });
  }
}
