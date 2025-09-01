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
 * Creates a viral LinkedIn post prompt using proven strategies from
 * Rand Fishkin, Leila Hormozi, Hiten Shah, and Naval Ravikant
 */
export function createViralLinkedInPrompt(
  options: PostGenerationOptions
): string {
  const {
    topic,
    tone = "professional",
    length = "medium",
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
