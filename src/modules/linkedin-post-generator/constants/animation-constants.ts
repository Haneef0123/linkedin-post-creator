import { Shape, AnimationConfig } from "../types/animation.types";

export const ANIMATION_SHAPES: Shape[] = [
  {
    name: "star",
    path: "M12,2 L15.09,8.26 L22,9.27 L17,14.14 L18.18,21.02 L12,17.77 L5.82,21.02 L7,14.14 L2,9.27 L8.91,8.26 Z",
    viewBox: "0 0 24 24"
  },
  {
    name: "circle",
    path: "M12,2 A10,10 0 1,1 12,22 A10,10 0 1,1 12,2",
    viewBox: "0 0 24 24"
  },
  {
    name: "square",
    path: "M4,4 L20,4 L20,20 L4,20 Z",
    viewBox: "0 0 24 24"
  },
  {
    name: "heart",
    path: "M12,21.35 L10.55,20.03 C5.4,15.36 2,12.27 2,8.5 C2,5.41 4.42,3 7.5,3 C9.24,3 10.91,3.81 12,5.08 C13.09,3.81 14.76,3 16.5,3 C19.58,3 22,5.41 22,8.5 C22,12.27 18.6,15.36 13.45,20.03 L12,21.35 Z",
    viewBox: "0 0 24 24"
  },
  {
    name: "lightning",
    path: "M11,4 L6,14 L12,14 L10,20 L16,10 L10,10 L11,4 Z",
    viewBox: "0 0 24 24"
  }
];

export const DEFAULT_ANIMATION_CONFIG: Required<AnimationConfig> = {
  size: 32,
  strokeWidth: 2,
  color: "#6b7280",
  animationSpeed: 100,
  pauseDuration: 300,
  transitionDuration: 150,
};

export const ANIMATION_PRESETS = {
  subtle: {
    size: 24,
    strokeWidth: 1.5,
    color: "#9ca3af",
    animationSpeed: 120,
    pauseDuration: 400,
    transitionDuration: 200,
  },
  normal: DEFAULT_ANIMATION_CONFIG,
  prominent: {
    size: 48,
    strokeWidth: 2.5,
    color: "#4b5563",
    animationSpeed: 80,
    pauseDuration: 200,
    transitionDuration: 100,
  },
} as const;
