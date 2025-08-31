import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  UI_TEXT,
  CSS_CLASSES,
  COMPONENT_CONFIG,
} from "../constants/ui-constants";

interface PostInputFormProps {
  topic: string;
  onTopicChange: (topic: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const PostInputForm: React.FC<PostInputFormProps> = ({
  topic,
  onTopicChange,
  onGenerate,
  isGenerating,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate();
    }
  };

  return (
    <div className={CSS_CLASSES.card.base}>
      <h2 className={CSS_CLASSES.cardTitle.large}>
        {UI_TEXT.inputForm.title}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="topic" className={CSS_CLASSES.form.label}>
            {UI_TEXT.inputForm.label}
          </label>
          <Textarea
            id="topic"
            placeholder={UI_TEXT.inputForm.placeholder}
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            className={CSS_CLASSES.form.textarea}
            rows={6}
          />
        </div>
        <Button
          type="submit"
          disabled={isGenerating || !topic.trim()}
          className={CSS_CLASSES.form.button}
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
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
