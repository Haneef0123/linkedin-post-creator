"use client";

import React from "react";
import { AnimationConfig } from "../types/animation.types";
import { ANIMATION_SHAPES, DEFAULT_ANIMATION_CONFIG } from "../constants/animation-constants";
import { usePathAnimation } from "../hooks/use-path-animation";
import { AnimatedSVGPath } from "./AnimatedSVGPath";

interface LoadingShapeAnimationProps extends AnimationConfig {
  isActive: boolean;
  className?: string;
}

export const LoadingShapeAnimation: React.FC<LoadingShapeAnimationProps> = ({
  isActive,
  size = DEFAULT_ANIMATION_CONFIG.size,
  strokeWidth = DEFAULT_ANIMATION_CONFIG.strokeWidth,
  color = DEFAULT_ANIMATION_CONFIG.color,
  animationSpeed = DEFAULT_ANIMATION_CONFIG.animationSpeed,
  pauseDuration = DEFAULT_ANIMATION_CONFIG.pauseDuration,
  transitionDuration = DEFAULT_ANIMATION_CONFIG.transitionDuration,
  className = "",
}) => {
  const { currentShape, animatedLength, opacity, pathRef } = usePathAnimation({
    shapes: ANIMATION_SHAPES,
    isActive,
    animationSpeed,
    pauseDuration,
    transitionDuration,
  });

  if (!isActive || !currentShape) {
    return null;
  }

  // Calculate dash array for the animation
  const pathLength = pathRef.current?.getTotalLength() || 0;

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <AnimatedSVGPath
        shape={currentShape}
        animatedLength={animatedLength}
        pathLength={pathLength}
        opacity={opacity}
        size={size}
        strokeWidth={strokeWidth}
        color={color}
        pathRef={pathRef}
      />
    </div>
  );
};
