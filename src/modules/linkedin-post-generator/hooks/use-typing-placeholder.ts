import { useState, useEffect, useRef } from "react";

interface UseTypingPlaceholderOptions {
  placeholders: readonly string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  isActive?: boolean;
}

export const useTypingPlaceholder = ({
  placeholders,
  typingSpeed = 70,
  pauseDuration = 800,
  deletingSpeed = 35,
  isActive = true,
}: UseTypingPlaceholderOptions) => {
  const [placeholder, setPlaceholder] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const charIdx = useRef(0);

  useEffect(() => {
    if (!isActive || placeholders.length === 0) {
      setPlaceholder("");
      return;
    }

    const currentPlaceholder = placeholders[activeIdx];
    if (!currentPlaceholder) return;

    let timer;
    if (typing) {
      if (charIdx.current < currentPlaceholder.length) {
        timer = setTimeout(() => {
          setPlaceholder(currentPlaceholder.substring(0, charIdx.current + 1));
          charIdx.current += 1;
        }, typingSpeed);
      } else {
        timer = setTimeout(() => setTyping(false), pauseDuration);
      }
    } else {
      if (charIdx.current > 0) {
        timer = setTimeout(() => {
          charIdx.current -= 1;
          setPlaceholder(currentPlaceholder.substring(0, charIdx.current));
        }, deletingSpeed);
      } else {
        timer = setTimeout(() => {
          setActiveIdx((prev) => (prev + 1) % placeholders.length);
          setTyping(true);
        }, 350);
      }
    }

    return () => clearTimeout(timer);
  }, [
    placeholder,
    typing,
    activeIdx,
    placeholders,
    typingSpeed,
    pauseDuration,
    deletingSpeed,
    isActive,
  ]);

  useEffect(() => {
    if (!isActive || placeholders.length === 0) {
      setPlaceholder("");
      return;
    }

    charIdx.current = typing ? 0 : placeholders[activeIdx]?.length || 0;
    if (typing) setPlaceholder("");
  }, [activeIdx, typing, isActive, placeholders]);

  return {
    currentText: placeholder,
    isTyping: typing,
    currentIndex: activeIdx,
  };
};
