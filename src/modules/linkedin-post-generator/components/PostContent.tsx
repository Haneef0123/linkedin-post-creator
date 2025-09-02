"use client";

import React from "react";
import { CSS_CLASSES, UI_TEXT } from "../constants/ui-constants";
import { PostLoadingState } from "./PostLoadingState";

interface PostContentProps {
  generatedPost: string;
  isGenerating: boolean;
  className?: string;
}

export const PostContent: React.FC<PostContentProps> = ({
  generatedPost,
  isGenerating,
  className = "",
}) => {
  const displayPost = generatedPost || UI_TEXT.postDisplay.placeholder;

  return (
    <div
      className={`${CSS_CLASSES.postDisplay.postBox} ${
        generatedPost
          ? CSS_CLASSES.postDisplay.postBoxGenerated
          : CSS_CLASSES.postDisplay.postBoxEmpty
      } ${className}`}
    >
      {isGenerating ? (
        <PostLoadingState 
          isGenerating={true}
          preset="normal"
        />
      ) : (
        <div
          className={`${CSS_CLASSES.postDisplay.postText} ${
            generatedPost
              ? CSS_CLASSES.postDisplay.postTextGenerated
              : CSS_CLASSES.postDisplay.postTextEmpty
          }`}
        >
          {displayPost}
        </div>
      )}
    </div>
  );
};
