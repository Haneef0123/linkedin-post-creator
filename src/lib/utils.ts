import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Types for LinkedIn post generation
export interface PostGenerationOptions {
  topic: string;
  tone?: string;
  length?: "short" | "medium" | "long";
  targetAudience?: string;
  includeEmojis?: boolean;
  includeHashtags?: boolean;
}

/**
 * Fetches the LinkedIn prompt template from Firebase and interpolates with user options
 */
export async function createViralLinkedInPrompt(
  options: PostGenerationOptions
): Promise<string> {
  // Validate input options
  if (!options?.topic?.trim()) {
    console.warn("No topic provided, using fallback prompt");
    return createFallbackPrompt(options);
  }

  try {
    // Fetch the prompt template from Firebase REST API
    const promptTemplate = await fetchPromptFromFirebaseREST(
      "linkedin-viral-prompt"
    );

    // Validate template exists and has content
    if (!promptTemplate?.trim()) {
      throw new Error("Empty template received from Firebase");
    }

    // Interpolate the template with user options
    return interpolatePrompt(promptTemplate, options);
  } catch (error) {
    console.error("Error creating LinkedIn prompt:", error);

    // Fallback to hardcoded prompt if Firebase fails
    return createFallbackPrompt(options);
  }
}

/**
 * Fetches prompt template from Firebase Firestore using REST API
 */
async function fetchPromptFromFirebaseREST(promptId: string): Promise<string> {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT;
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API;

    if (!projectId) {
      throw new Error("Firebase project ID not configured");
    }

    if (!apiKey) {
      throw new Error("Firebase API key not configured");
    }

    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/prompts/${promptId}?key=${apiKey}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Prompt document not found");
      }
      if (response.status === 403) {
        throw new Error(
          "Permission denied. Please check Firestore security rules or authentication."
        );
      }

      // Try to get more detailed error information
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Extract fields from Firestore REST API response
    const fields = data.fields;
    if (!fields) {
      throw new Error("No fields found in document");
    }

    const isActive = fields.isActive?.booleanValue;
    const template = fields.template?.stringValue;

    if (isActive === false) {
      throw new Error("Prompt template is not active");
    }

    if (!template?.trim()) {
      throw new Error("Template field is empty or not found");
    }

    return template;
  } catch (error) {
    console.error("Firebase REST API fetch error:", error);
    throw error;
  }
}

/**
 * Interpolates the prompt template with user options
 */
function interpolatePrompt(
  template: string,
  options: PostGenerationOptions
): string {
  const {
    topic,
    tone = "professional",
    length = "short",
    targetAudience = "professionals",
    includeEmojis = false,
    includeHashtags = true,
  } = options;

  // Validate required fields
  if (!template?.trim()) {
    throw new Error("Template is empty or invalid");
  }

  if (!topic?.trim()) {
    throw new Error("Topic is required for interpolation");
  }

  const lengthGuide: { [key: string]: string } = {
    short: "100-150 words",
    medium: "150-250 words",
    long: "250-400 words",
  };

  try {
    return template
      .replace(/\{\{topic\}\}/g, topic.trim())
      .replace(/\{\{tone\}\}/g, tone)
      .replace(/\{\{length\}\}/g, lengthGuide[length] || lengthGuide.short)
      .replace(/\{\{targetAudience\}\}/g, targetAudience)
      .replace(
        /\{\{includeEmojis\}\}/g,
        includeEmojis ? "Yes, strategically placed for emphasis" : "No"
      )
      .replace(
        /\{\{includeHashtags\}\}/g,
        includeHashtags ? "Yes, add 5-8 relevant hashtags at the end" : "No"
      );
  } catch (error) {
    console.error("Error interpolating template:", error);
    throw new Error("Failed to interpolate template with user options");
  }
}

/**
 * Fallback prompt if Firebase is unavailable
 */
function createFallbackPrompt(options: PostGenerationOptions): string {
  const {
    topic,
    tone = "professional",
    length = "short",
    targetAudience = "professionals",
    includeEmojis = false,
    includeHashtags = true,
  } = options;

  const lengthGuide: { [key: string]: string } = {
    short: "100-150 words",
    medium: "150-250 words",
    long: "250-400 words",
  };

  return `##**Role:**  

Content Strategist & Viral LinkedIn Copywriter  

##**Objective:**  

Generate a LinkedIn post that combines the language, hooks, and metrics of Rand Fishkin, Leila Hormozi, Hiten Shah, and Naval Ravikant's viral strategies, tailored for the topic "${topic.trim()}" to maximize engagement and virality.  

##**Context:**  

The prompt should empower a LinkedIn content generator (AI or human) to craft a post that uses a bold contrarian hook, actionable steps, personal anecdote, permission-giving tone, and clear call-to-action—reflecting the proven viral DNA of the four profiles analyzed.  

##**Instructions:**  

###**Instruction 1 :**  

Begin with a counter-intuition hook challenging a prevailing belief related to "${topic.trim()}" (e.g., "Most people think [common belief about ${topic.trim()}]—here's why that's killing real progress.").  

###**Instruction 2 :**  

Provide a numbered list of 3–4 practical reframes or steps, each combining data insight or personal lesson (e.g., "1. Stop chasing hype: build modular prototypes first").  

###**Instruction 3 :**  

Include a brief micro-story illustrating overcoming doubt or defying convention related to "${topic.trim()}", then close with a permission-granting call-to-action (e.g., "You have permission to ignore the hype—start shipping your own solutions today.").  

##**Notes:**  

- Note 1: Maintain an unapologetic, conversational tone.  

- Note 2: Integrate at least one statistic or data point to bolster authority.  

- Note 3: Use strategic formatting (line breaks, bold for emphasis) to enhance readability and scroll-stopping power.

##**Additional Requirements:**
- Tone: ${tone}
- Length: ${lengthGuide[length]}
- Target audience: ${targetAudience}
- Include emojis: ${
    includeEmojis ? "Yes, strategically placed for emphasis" : "No"
  }
- Include hashtags: ${
    includeHashtags ? "Yes, add 5-8 relevant hashtags at the end" : "No"
  }

Return only the LinkedIn post content, nothing else.`;
}
