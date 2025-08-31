import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PostStats } from "../hooks/use-post-generator";
import { UI_TEXT, CSS_CLASSES } from "../constants/ui-constants";

interface PostDisplayProps {
  generatedPost: string;
  copySuccess: boolean;
  onCopy: () => void;
  stats: PostStats;
}

export const PostDisplay: React.FC<PostDisplayProps> = ({
  generatedPost,
  copySuccess,
  onCopy,
  stats,
}) => {
  const displayPost = generatedPost || UI_TEXT.postDisplay.placeholder;

  return (
    <Card className={CSS_CLASSES.card.base}>
      <CardHeader>
        <CardTitle className={CSS_CLASSES.cardTitle.large}>
          {UI_TEXT.postDisplay.title}
        </CardTitle>
      </CardHeader>
      <CardContent className={CSS_CLASSES.postDisplay.container}>
        <div className={CSS_CLASSES.postDisplay.postArea}>
          <div
            className={`${CSS_CLASSES.postDisplay.postBox} ${
              generatedPost
                ? CSS_CLASSES.postDisplay.postBoxGenerated
                : CSS_CLASSES.postDisplay.postBoxEmpty
            }`}
          >
            <div
              className={`${CSS_CLASSES.postDisplay.postText} ${
                generatedPost
                  ? CSS_CLASSES.postDisplay.postTextGenerated
                  : CSS_CLASSES.postDisplay.postTextEmpty
              }`}
            >
              {displayPost}
            </div>
          </div>
        </div>

        <div className={CSS_CLASSES.postDisplay.copyButtonContainer}>
          <Button
            variant="outline"
            size="lg"
            className={`${CSS_CLASSES.postDisplay.copyButton} ${
              copySuccess ? CSS_CLASSES.postDisplay.copyButtonSuccess : ""
            }`}
            disabled={!generatedPost}
            onClick={onCopy}
          >
            {copySuccess
              ? UI_TEXT.postDisplay.copyButtonSuccess
              : UI_TEXT.postDisplay.copyButtonDefault}
          </Button>
        </div>

        <div className={CSS_CLASSES.postDisplay.statsContainer}>
          <div className={CSS_CLASSES.postDisplay.statsGrid}>
            <div className={CSS_CLASSES.postDisplay.statItem}>
              <div className={CSS_CLASSES.postDisplay.statNumber}>
                {stats.characters}
              </div>
              <div className={CSS_CLASSES.postDisplay.statLabel}>
                {UI_TEXT.postDisplay.stats.characters}
              </div>
            </div>
            <div className={CSS_CLASSES.postDisplay.statItemBorder}>
              <div className={CSS_CLASSES.postDisplay.statNumber}>
                {stats.words}
              </div>
              <div className={CSS_CLASSES.postDisplay.statLabel}>
                {UI_TEXT.postDisplay.stats.words}
              </div>
            </div>
            <div className={CSS_CLASSES.postDisplay.statItem}>
              <div className={CSS_CLASSES.postDisplay.statNumber}>
                {stats.hashtags}
              </div>
              <div className={CSS_CLASSES.postDisplay.statLabel}>
                {UI_TEXT.postDisplay.stats.hashtags}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
