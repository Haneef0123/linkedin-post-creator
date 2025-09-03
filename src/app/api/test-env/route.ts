import { NextResponse } from "next/server";

export async function GET() {
  const envCheck = {
    hasServerProjectId: !!process.env.FIREBASE_PROJECT_ID,
    hasServerApiKey: !!process.env.FIREBASE_API_KEY,
    hasClientProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    hasClientApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    serverProjectId: process.env.FIREBASE_PROJECT_ID || "MISSING",
    clientProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "MISSING",
    allFirebaseKeys: Object.keys(process.env).filter((key) =>
      key.includes("FIREBASE")
    ),
  };

  return NextResponse.json(envCheck);
}
