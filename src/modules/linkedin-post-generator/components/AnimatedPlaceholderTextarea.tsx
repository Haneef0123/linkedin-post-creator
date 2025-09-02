"use client";

import React, { forwardRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useTypingPlaceholder } from "../hooks/use-typing-placeholder";

interface AnimatedPlaceholderTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholders: readonly string[];
  typingSpeed?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
}

export const AnimatedPlaceholderTextarea = forwardRef<
  HTMLTextAreaElement,
  AnimatedPlaceholderTextareaProps
>(
  (
    {
      placeholders,
      typingSpeed,
      pauseDuration,
      deletingSpeed,
      value,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasUserInput = Boolean(value && String(value).length > 0);
    const showAnimatedPlaceholder = !hasUserInput && !isFocused;

    const { currentText } = useTypingPlaceholder({
      placeholders,
      typingSpeed,
      pauseDuration,
      deletingSpeed,
      isActive: showAnimatedPlaceholder,
    });

    const displayPlaceholder = showAnimatedPlaceholder
      ? currentText
      : props.placeholder;

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <Textarea
        ref={ref}
        {...props}
        value={value}
        placeholder={displayPlaceholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`${props.className || ""} placeholder:text-gray-400`}
      />
    );
  }
);

AnimatedPlaceholderTextarea.displayName = "AnimatedPlaceholderTextarea";
