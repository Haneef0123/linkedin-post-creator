import React from "react";
import { PostStats as PostStatsType } from "../hooks/use-post-generator";
import { UI_TEXT, CSS_CLASSES } from "../constants/ui-constants";
import { PostContent } from "./PostContent";
import { PostActions } from "./PostActions";
import { PostStats } from "./PostStats";

interface PostDisplayProps {
  generatedPost: string;
  copySuccess: boolean;
  onCopy: () => void;
  stats: PostStatsType;
  isGenerating?: boolean;
}

export const PostDisplay: React.FC<PostDisplayProps> = ({
  generatedPost,
  copySuccess,
  onCopy,
  stats,
  isGenerating = false,
}) => {
  return (
    <div className={CSS_CLASSES.card.base}>
      <div className="mb-4 md:mb-6">
        <h2 className={CSS_CLASSES.cardTitle.large}>
          {UI_TEXT.postDisplay.title}
        </h2>
      </div>
      
      <div className={CSS_CLASSES.postDisplay.container}>
        <div className={CSS_CLASSES.postDisplay.postArea}>
          <PostContent
            generatedPost={generatedPost}
            isGenerating={isGenerating}
          />
        </div>

        <PostActions
          generatedPost={generatedPost}
          copySuccess={copySuccess}
          onCopy={onCopy}
          isGenerating={isGenerating}
        />

        <PostStats stats={stats} />
      </div>
    </div>
  );
};
