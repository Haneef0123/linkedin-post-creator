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

// Simple API call to our Next.js API route - adapted to match hello-gpt-app-router response handling
async function callOpenAIAPI(
  topic: string,
  options: PostGeneratorOptions = {}
) {
  const response = await fetch("/api/generate-post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      ...options,
    }),
  });

  const body = await response.json();

  // Handle response format exactly like hello-gpt-app-router reference
  if (response.status !== 200) {
    throw new Error(body.error?.message || "An error has occurred");
  }

  return body.content;
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
      const generatedContent = await callOpenAIAPI(topic.trim(), options);
      setGeneratedPost(generatedContent);
    } catch (err) {
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
      // Silently handle copy errors
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
