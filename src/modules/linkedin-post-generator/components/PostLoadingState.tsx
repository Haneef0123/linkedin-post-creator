"use client";

import React from "react";
import { LoadingState } from "./LoadingState";
import { LoadingShapeAnimation } from "./LoadingShapeAnimation";
import { ANIMATION_PRESETS } from "../constants/animation-constants";

interface PostLoadingStateProps {
  isGenerating: boolean;
  message?: string;
  preset?: keyof typeof ANIMATION_PRESETS;
  className?: string;
}

export const PostLoadingState: React.FC<PostLoadingStateProps> = ({
  isGenerating,
  message = "Generating your LinkedIn post...",
  preset = "normal",
  className = "",
}) => {
  const animationConfig = ANIMATION_PRESETS[preset];

  return (
    <LoadingState 
      isLoading={isGenerating}
      message={message}
      className={className}
    >
      <LoadingShapeAnimation 
        isActive={isGenerating}
        {...animationConfig}
      />
    </LoadingState>
  );
};
