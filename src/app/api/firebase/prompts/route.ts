import { NextRequest, NextResponse } from "next/server";

// Server-side Firebase operations using environment variables
async function getFirebasePrompt(promptId: string) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey = process.env.FIREBASE_API_KEY;

  if (!projectId || !apiKey) {
    throw new Error("Firebase configuration missing on server");
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/prompts/${promptId}?key=${apiKey}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Prompt document not found");
    }
    if (response.status === 403) {
      throw new Error(
        "Permission denied. Please check Firestore security rules."
      );
    }

    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.error?.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data.fields?.template?.stringValue || null;
}

async function updateFirebasePrompt(promptId: string, template: string) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey = process.env.FIREBASE_API_KEY;

  if (!projectId || !apiKey) {
    throw new Error("Firebase configuration missing on server");
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/prompts/${promptId}?key=${apiKey}`;

  const payload = {
    fields: {
      id: { stringValue: promptId },
      name: { stringValue: "LinkedIn Viral Post Generator" },
      template: { stringValue: template },
      version: { stringValue: "1.0" },
      isActive: { booleanValue: true },
      createdAt: { stringValue: new Date().toISOString() },
      updatedAt: { stringValue: new Date().toISOString() },
    },
  };

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(
        "Permission denied. Please check Firestore security rules."
      );
    }

    const errorData = await response.json().catch(() => null);
    const errorMessage =
      errorData?.error?.message || `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  return response.json();
}

// GET /api/firebase/prompts?id=prompt-id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const promptId = searchParams.get("id");

    if (!promptId) {
      return NextResponse.json(
        { error: "Prompt ID is required" },
        { status: 400 }
      );
    }

    const template = await getFirebasePrompt(promptId);

    if (!template) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    return NextResponse.json({ template });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// POST /api/firebase/prompts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, template } = body;

    if (!id || !template) {
      return NextResponse.json(
        { error: "ID and template are required" },
        { status: 400 }
      );
    }

    await updateFirebasePrompt(id, template);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating prompt:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
