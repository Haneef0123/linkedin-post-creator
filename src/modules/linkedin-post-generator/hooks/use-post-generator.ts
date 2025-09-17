"use client";

import { useState } from "react";
import { getPostTemplate } from "../data/post-templates";
import { COMPONENT_CONFIG } from "../constants/ui-constants";
import { GeminiApiService } from "@/services/gemini-api.service";

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
  industry?: string;
}

// Updated API call using new service but maintaining original logic and error handling
async function callGeminiAPI(
  topic: string,
  options: PostGeneratorOptions = {}
): Promise<string> {
  // Maintaining original function name and signature for backward compatibility
  const geminiService = new GeminiApiService();

  const result = await geminiService.generatePost({
    topic,
    tone: options.tone,
    length: options.length || "short", // Default to short when not specified
    includeHashtags: options.includeHashtags,
    includeEmojis: options.includeEmojis,
    targetAudience: options.targetAudience,
  });

  // Original response handling logic - maintaining exact error format
  if (!result.success) {
    throw new Error(result.error?.message || "An error has occurred");
  }

  return result.data?.content || "";
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
    // test

    try {
      const generatedContent = await callGeminiAPI(topic.trim(), options);
      setGeneratedPost(generatedContent);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );

      // Fallback to template-based generation
      const selectedTemplate = getPostTemplate(
        options.industry || "tech",
        topic
      );
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
    } catch {
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
