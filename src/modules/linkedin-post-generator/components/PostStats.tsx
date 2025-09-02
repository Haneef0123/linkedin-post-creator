"use client";

import React from "react";
import { PostStats as PostStatsType } from "../hooks/use-post-generator";
import { CSS_CLASSES, UI_TEXT } from "../constants/ui-constants";

interface PostStatsProps {
  stats: PostStatsType;
  className?: string;
}

interface StatItemProps {
  value: number;
  label: string;
  className?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, className = "" }) => (
  <div className={className}>
    <div className={CSS_CLASSES.postDisplay.statNumber}>
      {value}
    </div>
    <div className={CSS_CLASSES.postDisplay.statLabel}>
      {label}
    </div>
  </div>
);

export const PostStats: React.FC<PostStatsProps> = ({
  stats,
  className = "",
}) => {
  return (
    <div className={`${CSS_CLASSES.postDisplay.statsContainer} ${className}`}>
      <div className={CSS_CLASSES.postDisplay.statsGrid}>
        <StatItem
          value={stats.characters}
          label={UI_TEXT.postDisplay.stats.characters}
          className={CSS_CLASSES.postDisplay.statItem}
        />
        <StatItem
          value={stats.words}
          label={UI_TEXT.postDisplay.stats.words}
          className={CSS_CLASSES.postDisplay.statItemBorder}
        />
        <StatItem
          value={stats.hashtags}
          label={UI_TEXT.postDisplay.stats.hashtags}
          className={CSS_CLASSES.postDisplay.statItem}
        />
      </div>
    </div>
  );
};
