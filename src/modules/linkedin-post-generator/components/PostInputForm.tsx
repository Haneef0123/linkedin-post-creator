"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { AnimatedPlaceholderTextarea } from "./AnimatedPlaceholderTextarea";
import { UI_TEXT, CSS_CLASSES } from "../constants/ui-constants";
import { PostGeneratorOptions } from "../hooks/use-post-generator";

interface PostInputFormProps {
  topic: string;
  onTopicChange: (topic: string) => void;
  onGenerate: (options?: PostGeneratorOptions) => void;
  isGenerating: boolean;
  error?: string | null;
}

export const PostInputForm: React.FC<PostInputFormProps> = ({
  topic,
  onTopicChange,
  onGenerate,
  isGenerating,
  error,
}) => {
  const [options, setOptions] = useState<PostGeneratorOptions>({
    tone: "professional",
    includeHashtags: true,
    includeEmojis: false,
    targetAudience: "professionals",
    enableWebSearch: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(options);
    }
  };

  return (
    <div className={CSS_CLASSES.card.base}>
      <div className="mb-4 md:mb-6">
        <h2 className={CSS_CLASSES.cardTitle.large}>
          {UI_TEXT.inputForm.title}
        </h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={CSS_CLASSES.form.container}>
        <div className={CSS_CLASSES.form.fieldContainer}>
          <label htmlFor="topic" className={CSS_CLASSES.form.label}>
            {UI_TEXT.inputForm.label}
          </label>
          <AnimatedPlaceholderTextarea
            id="topic"
            placeholders={UI_TEXT.inputForm.animatedPlaceholders}
            typingSpeed={70}
            pauseDuration={800}
            deletingSpeed={35}
            value={topic}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onTopicChange(e.target.value)}
            className={CSS_CLASSES.form.textarea}
            rows={6}
          />
        </div>

        {/* AI Options */}
        <div className="grid grid-cols-1 gap-4 mb-4">
          <Select
            label="Tone"
            value={options.tone}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setOptions((prev) => ({
                ...prev,
                tone: e.target.value as
                  | "professional"
                  | "casual"
                  | "inspirational"
                  | "educational",
              }))
            }
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="inspirational">Inspirational</option>
            <option value="educational">Educational</option>
          </Select>

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length
            </label>
            <select
              value={options.length}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  length: e.target.value as "short" | "medium" | "long",
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="short">Short (100-150 words)</option>
              <option value="medium">Medium (150-250 words)</option>
              <option value="long">Long (250-400 words)</option>
            </select>
          </div> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.includeHashtags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOptions((prev) => ({
                  ...prev,
                  includeHashtags: e.target.checked,
                }))
              }
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Include Hashtags</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.includeEmojis}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOptions((prev) => ({
                  ...prev,
                  includeEmojis: e.target.checked,
                }))
              }
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Include Emojis</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={options.enableWebSearch}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOptions((prev) => ({
                  ...prev,
                  enableWebSearch: e.target.checked,
                }))
              }
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Enable Web Search</span>
          </label>
        </div>
        <Button
          type="submit"
          disabled={isGenerating || !topic.trim()}
          className="w-full h-12 text-sm font-bold transition-all duration-200 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white shadow-md hover:shadow-lg transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none rounded-lg"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {UI_TEXT.inputForm.generatingText}
            </>
          ) : (
            UI_TEXT.inputForm.generateButton
          )}
        </Button>
      </form>
    </div>
  );
};
