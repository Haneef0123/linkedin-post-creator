"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CSS_CLASSES, UI_TEXT } from "../constants/ui-constants";

interface PostActionsProps {
  generatedPost: string;
  copySuccess: boolean;
  onCopy: () => void;
  isGenerating?: boolean;
  className?: string;
}

export const PostActions: React.FC<PostActionsProps> = ({
  generatedPost,
  copySuccess,
  onCopy,
  isGenerating = false,
  className = "",
}) => {
  const isDisabled = !generatedPost || isGenerating;

  return (
    <div className={`${CSS_CLASSES.postDisplay.copyButtonContainer} ${className}`}>
      <Button
        variant="outline"
        size="lg"
        className={`min-w-[160px] h-12 text-sm font-bold transition-all duration-200 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] ${
          copySuccess
            ? "bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
        } ${
          isDisabled
            ? "opacity-50 cursor-not-allowed transform-none"
            : ""
        }`}
        disabled={isDisabled}
        onClick={onCopy}
      >
        {copySuccess
          ? UI_TEXT.postDisplay.copyButtonSuccess
          : UI_TEXT.postDisplay.copyButtonDefault}
      </Button>
    </div>
  );
};
