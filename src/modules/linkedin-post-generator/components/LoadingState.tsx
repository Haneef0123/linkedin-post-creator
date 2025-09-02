"use client";

import React from "react";
import { LoadingStateProps } from "../types/animation.types";

interface LoadingStateComponentProps extends LoadingStateProps {
  children: React.ReactNode;
}

export const LoadingState: React.FC<LoadingStateComponentProps> = ({
  isLoading,
  message,
  className = "",
  children,
}) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={`flex flex-col items-center justify-center py-8 space-y-4 ${className}`}>
      {children}
      {message && (
        <div className="text-sm text-gray-500 animate-pulse">
          {message}
        </div>
      )}
    </div>
  );
};
