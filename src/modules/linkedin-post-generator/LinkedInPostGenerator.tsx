"use client";

import React from "react";
import { PostGeneratorHeader } from "./components/PostGeneratorHeader";
import { PostInputForm } from "./components/PostInputForm";
import { PostDisplay } from "./components/PostDisplay";
import { PostTipsSection } from "./components/PostTipsSection";
import { usePostGenerator } from "./hooks/use-post-generator";
import { CSS_CLASSES } from "./constants/ui-constants";

export const LinkedInPostGenerator: React.FC = () => {
  const {
    topic,
    setTopic,
    generatedPost,
    isGenerating,
    copySuccess,
    generatePost,
    copyToClipboard,
    getPostStats,
  } = usePostGenerator();

  const stats = getPostStats();

  return (
    <div className={CSS_CLASSES.layout.container}>
      <div className={CSS_CLASSES.layout.maxWidth}>
        <PostGeneratorHeader />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <PostInputForm
            topic={topic}
            onTopicChange={setTopic}
            onGenerate={generatePost}
            isGenerating={isGenerating}
          />

          <PostDisplay
            generatedPost={generatedPost}
            copySuccess={copySuccess}
            onCopy={copyToClipboard}
            stats={stats}
          />
        </div>

        <PostTipsSection />
      </div>
    </div>
  );
};
