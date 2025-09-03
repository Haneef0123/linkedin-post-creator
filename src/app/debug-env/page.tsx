"use client";

import { useEffect, useState } from "react";

// Access environment variables at module level
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const FIREBASE_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export default function DebugPage() {
  const [envVars, setEnvVars] = useState<any>(null);

  useEffect(() => {
    const vars = {
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: FIREBASE_PROJECT_ID,
      NEXT_PUBLIC_FIREBASE_API_KEY: FIREBASE_API_KEY,
      hasProjectId: !!FIREBASE_PROJECT_ID,
      hasApiKey: !!FIREBASE_API_KEY,
      directAccess: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      },
    };
    setEnvVars(vars);
    console.log("Environment variables:", vars);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="mb-4">
        <p>Module level access:</p>
        <p>Project ID: {FIREBASE_PROJECT_ID || "MISSING"}</p>
        <p>API Key: {FIREBASE_API_KEY ? "***PRESENT***" : "MISSING"}</p>
      </div>
      <pre className="bg-gray-100 p-4 rounded overflow-auto">
        {JSON.stringify(envVars, null, 2)}
      </pre>
    </div>
  );
}
