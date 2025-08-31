"use client";

import { useState } from "react";
import { getPostTemplate } from "../data/post-templates";
import { COMPONENT_CONFIG } from "../constants/ui-constants";

export interface PostStats {
  characters: number;
  words: number;
  hashtags: number;
}

export interface PostGeneratorOptions {
  tone?: "professional" | "casual" | "inspirational" | "educational";
  length?: "short" | "medium" | "long";
  includeHashtags?: boolean;
  includeEmojis?: boolean;
  targetAudience?: string;
}

// Simple direct Gemini API call
async function callGeminiAPI(prompt: string) {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!API_KEY) {
    throw new Error(
      "Gemini API key not found. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file"
    );
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Gemini API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

function buildPrompt(topic: string, options: PostGeneratorOptions = {}) {
  const {
    tone = "professional",
    length = "medium",
    includeHashtags = true,
    includeEmojis = false,
    targetAudience = "professionals",
  } = options;

  const lengthGuide = {
    short: "100-150 words",
    medium: "150-250 words",
    long: "250-400 words",
  };

  return `Create a compelling LinkedIn post about: ${topic}

Requirements:
- Tone: ${tone}
- Length: ${lengthGuide[length]}
- Target audience: ${targetAudience}
- Include emojis: ${includeEmojis ? "Yes" : "No"}
- Include hashtags: ${
    includeHashtags ? "Yes, add 5-8 relevant hashtags at the end" : "No"
  }

Structure:
1. Start with an engaging hook
2. Provide valuable insights or information
3. Include a call-to-action
4. Keep it authentic and professional

Return only the LinkedIn post content, nothing else.`;
}

export const usePostGenerator = () => {
  const [topic, setTopic] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePost = async (options: PostGeneratorOptions = {}) => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const prompt = buildPrompt(topic.trim(), options);
      const generatedContent = await callGeminiAPI(prompt);
      setGeneratedPost(generatedContent);
    } catch (err) {
      console.error("Error generating post:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );

      // Fallback to template-based generation
      const selectedTemplate = getPostTemplate(topic);
      setGeneratedPost(selectedTemplate);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedPost) return;

    try {
      await navigator.clipboard.writeText(generatedPost);
      setCopySuccess(true);
      setTimeout(
        () => setCopySuccess(false),
        COMPONENT_CONFIG.animation.copySuccessTimeout
      );
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const getPostStats = (): PostStats => {
    if (!generatedPost) return { characters: 0, words: 0, hashtags: 0 };

    const characters = generatedPost.length;
    const words = generatedPost.trim().split(/\s+/).length;
    const hashtags = (generatedPost.match(/#\w+/g) || []).length;

    return { characters, words, hashtags };
  };

  return {
    topic,
    setTopic,
    generatedPost,
    isGenerating,
    copySuccess,
    error,
    generatePost,
    copyToClipboard,
    getPostStats,
    clearError: () => setError(null),
  };
};
