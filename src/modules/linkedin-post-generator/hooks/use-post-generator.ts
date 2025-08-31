"use client";

import { useState } from "react";
import { getPostTemplate } from "../data/post-templates";
import { COMPONENT_CONFIG } from "../constants/ui-constants";

export interface PostStats {
  characters: number;
  words: number;
  hashtags: number;
}

export const usePostGenerator = () => {
  const [topic, setTopic] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const generatePost = () => {
    if (!topic.trim()) return;

    setIsGenerating(true);

    // Simulate API delay
    setTimeout(() => {
      const selectedTemplate = getPostTemplate(topic);
      setGeneratedPost(selectedTemplate);
      setIsGenerating(false);
    }, COMPONENT_CONFIG.animation.generationDelay);
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
    generatePost,
    copyToClipboard,
    getPostStats,
  };
};
