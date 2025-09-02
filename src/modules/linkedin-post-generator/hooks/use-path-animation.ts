import { useState, useEffect, useRef } from "react";
import { Shape } from "../types/animation.types";

interface UsePathAnimationProps {
  shapes: Shape[];
  isActive: boolean;
  animationSpeed: number;
  pauseDuration: number;
  transitionDuration: number;
}

export const usePathAnimation = ({
  shapes,
  isActive,
  animationSpeed,
  pauseDuration,
  transitionDuration,
}: UsePathAnimationProps) => {
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(true);
  const [pathLength, setPathLength] = useState(0);
  const [animatedLength, setAnimatedLength] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const pathRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Calculate path length when shape changes
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
      setAnimatedLength(isDrawing ? 0 : length);
    }
  }, [currentShapeIndex, isDrawing]);

  // Reset animation state when becoming inactive
  useEffect(() => {
    if (!isActive) {
      setAnimatedLength(0);
      setCurrentShapeIndex(0);
      setIsDrawing(true);
      setOpacity(1);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }
  }, [isActive]);

  // Main animation loop
  useEffect(() => {
    if (!isActive || pathLength === 0 || shapes.length === 0) return;

    const animate = () => {
      setAnimatedLength(prev => {
        if (isDrawing) {
          // Drawing phase
          const newLength = prev + (pathLength / animationSpeed);
          if (newLength >= pathLength) {
            // Shape is fully drawn, pause then start erasing
            setTimeout(() => setIsDrawing(false), pauseDuration);
            return pathLength;
          }
          return newLength;
        } else {
          // Erasing phase
          const newLength = prev - (pathLength / animationSpeed);
          if (newLength <= 0) {
            // Shape is fully erased, fade out and move to next shape
            setOpacity(0);
            setTimeout(() => {
              setCurrentShapeIndex(prev => (prev + 1) % shapes.length);
              setIsDrawing(true);
              setOpacity(1);
            }, transitionDuration);
            return 0;
          }
          return newLength;
        }
      });

      if (isActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, pathLength, isDrawing, animationSpeed, pauseDuration, transitionDuration, shapes.length]);

  return {
    currentShape: shapes[currentShapeIndex],
    animatedLength,
    opacity,
    pathRef,
  };
};
