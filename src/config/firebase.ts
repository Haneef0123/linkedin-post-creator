// Firebase configuration - secure server-side only access
// This file should only be used server-side to avoid environment variable exposure

export function getFirebaseConfig() {
  // Only use this function server-side
  if (typeof window !== "undefined") {
    throw new Error("Firebase config should not be accessed client-side. Use API routes instead.");
  }
  
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  };
  
  if (!config.apiKey || !config.projectId) {
    throw new Error("Firebase configuration missing. Check environment variables.");
  }
  
  return config;
}

export function isFirebaseConfigured(): boolean {
  if (typeof window !== "undefined") {
    return false; // Client-side should use API routes
  }
  
  return !!(process.env.FIREBASE_API_KEY && process.env.FIREBASE_PROJECT_ID);
}

console.log("Firebase config loaded safely (server-side only):", {
  isServer: typeof window === "undefined",
  isConfigured: typeof window === "undefined" ? isFirebaseConfigured() : "client-side"
});
