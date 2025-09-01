// API Constants - Maintaining original error messages and patterns from route.ts
export const API_ENDPOINTS = {
  GEMINI: {
    BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
    MODELS: {
      FLASH: 'gemini-1.5-flash',
      PRO: 'gemini-1.5-pro',
    },
  },
  INTERNAL: {
    GENERATE_POST: '/api/generate-post',
  }
} as const;

// Original error messages from the codebase - preserving exact wording
export const API_ERRORS = {
  MISSING_API_KEY: 'Gemini API key is not configured',
  INVALID_REQUEST: 'Topic is required',
  QUOTA_EXCEEDED: 'Gemini API quota exceeded. Please check your usage at https://console.cloud.google.com/',
  NETWORK_ERROR: 'Network request failed',
  UNKNOWN_ERROR: 'An error has occurred',
  UNSUCCESSFUL_REQUEST: 'Gemini API request was unsuccessful.',
  UNABLE_TO_GENERATE: 'Unable to generate content',
} as const;

// HTTP Status codes - maintaining original status codes from route.ts
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;
