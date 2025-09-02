"use client";

import React, { useRef } from "react";
import {
  PostGeneratorHeader,
  PostInputForm,
  PostDisplay,
  PostTipsSection,
} from "./components";
import { usePostGenerator } from "./hooks";
import { CSS_CLASSES } from "./constants";

export const LinkedInPostGenerator: React.FC = () => {
  const postDisplayRef = useRef<HTMLDivElement>(null);

  const {
    topic,
    setTopic,
    generatedPost,
    isGenerating,
    copySuccess,
    error,
    generatePost,
    copyToClipboard,
    getPostStats,
  } = usePostGenerator();

  const stats = getPostStats();

  const scrollToPostDisplay = () => {
    // Only scroll on mobile devices (screen width < 768px)
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      postDisplayRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleGenerate = (options?: any) => {
    generatePost(options);
    // Small delay to ensure the component state updates
    setTimeout(() => {
      scrollToPostDisplay();
    }, 100);
  };

  return (
    <div className={CSS_CLASSES.layout.container}>
      <div className={CSS_CLASSES.layout.maxWidth}>
        <PostGeneratorHeader />

        <div className={CSS_CLASSES.layout.grid}>
          <div className="w-full">
            <PostInputForm
              topic={topic}
              onTopicChange={setTopic}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
              error={error}
            />
          </div>

          <div className="w-full" ref={postDisplayRef}>
            <PostDisplay
              generatedPost={generatedPost}
              copySuccess={copySuccess}
              onCopy={copyToClipboard}
              stats={stats}
              isGenerating={isGenerating}
            />
          </div>
        </div>

        <div className="mt-8 md:mt-8">
          <PostTipsSection />
        </div>
      </div>
    </div>
  );
};
