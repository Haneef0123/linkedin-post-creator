// API Configuration - Centralized configuration for all API endpoints and settings
export const API_CONFIG = {
  // Gemini API Configuration - maintaining original endpoint structure
  GEMINI: {
    BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
    MODEL: 'gemini-1.5-flash',
    ENDPOINTS: {
      GENERATE_CONTENT: (apiKey: string) => 
        `${API_CONFIG.GEMINI.BASE_URL}/models/${API_CONFIG.GEMINI.MODEL}:generateContent?key=${apiKey}`
    },
    // Original generation config from route.ts
    DEFAULT_CONFIG: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 300,
    },
    // Add grounding configuration for web search
    GROUNDING_CONFIG: {
      googleSearchRetrieval: {
        dynamicRetrievalConfig: {
          mode: "MODE_DYNAMIC",
          dynamicThreshold: 0.7,
        },
      },
    },
  },
  
  // Internal API endpoints - keeping original structure
  INTERNAL: {
    BASE_URL: process.env.NODE_ENV === 'production' ? '/api' : '/api',
    ENDPOINTS: {
      GENERATE_POST: '/api/generate-post',
    }
  },

  // Environment detection - maintaining original logic
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;
