"use client";

import React from "react";
import { 
  PostGeneratorHeader, 
  PostInputForm, 
  PostDisplay, 
  PostTipsSection 
} from "./components";
import { usePostGenerator } from "./hooks";
import { CSS_CLASSES } from "./constants";

export const LinkedInPostGenerator: React.FC = () => {
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

  return (
    <div className={CSS_CLASSES.layout.container}>
      <div className={CSS_CLASSES.layout.maxWidth}>
        <PostGeneratorHeader />

        <div className={CSS_CLASSES.layout.grid}>
          <div className="w-full">
            <PostInputForm
              topic={topic}
              onTopicChange={setTopic}
              onGenerate={generatePost}
              isGenerating={isGenerating}
              error={error}
            />
          </div>

          <div className="w-full">
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
