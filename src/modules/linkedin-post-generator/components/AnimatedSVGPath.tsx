"use client";

import React from "react";
import { Shape } from "../types/animation.types";

interface AnimatedSVGPathProps {
  shape: Shape;
  animatedLength: number;
  pathLength: number;
  opacity: number;
  size: number;
  strokeWidth: number;
  color: string;
  pathRef: React.RefObject<SVGPathElement | null>;
  className?: string;
}

export const AnimatedSVGPath: React.FC<AnimatedSVGPathProps> = ({
  shape,
  animatedLength,
  pathLength,
  opacity,
  size,
  strokeWidth,
  color,
  pathRef,
  className = "",
}) => {
  const dashArray = `${animatedLength} ${pathLength}`;

  return React.createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: shape.viewBox,
      className: `drop-shadow-sm transition-opacity duration-150 ${className}`,
      xmlns: "http://www.w3.org/2000/svg",
      style: { opacity }
    },
    React.createElement('path', {
      ref: pathRef,
      d: shape.path,
      fill: "none",
      stroke: color,
      strokeWidth: strokeWidth,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeDasharray: dashArray,
      strokeDashoffset: "0",
      style: {
        transition: 'none',
      }
    })
  );
};
