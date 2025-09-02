export interface Shape {
  name: string;
  path: string;
  viewBox: string;
}

export interface AnimationConfig {
  size?: number;
  strokeWidth?: number;
  color?: string;
  animationSpeed?: number;
  pauseDuration?: number;
  transitionDuration?: number;
}

export interface LoadingStateProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}
