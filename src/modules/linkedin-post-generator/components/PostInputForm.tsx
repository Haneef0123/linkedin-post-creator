import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  return (
    <Card className={CSS_CLASSES.card.base}>
      <CardHeader>
        <CardTitle className={CSS_CLASSES.cardTitle.large}>
          {UI_TEXT.inputForm.title}
        </CardTitle>
      </CardHeader>
      <CardContent className={CSS_CLASSES.form.container}>
        <div className={CSS_CLASSES.form.fieldContainer}>
          <label
            htmlFor={COMPONENT_CONFIG.textarea.id}
            className={CSS_CLASSES.form.label}
          >
            {UI_TEXT.inputForm.label}
          </label>
          <Textarea
            id={COMPONENT_CONFIG.textarea.id}
            placeholder={UI_TEXT.inputForm.placeholder}
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            className={CSS_CLASSES.form.textarea}
          />
        </div>
        <Button
          className={CSS_CLASSES.form.button}
          disabled={!topic.trim() || isGenerating}
          onClick={onGenerate}
        >
          {isGenerating ? (
            <div className={CSS_CLASSES.spinner.container}>
              <div className={CSS_CLASSES.spinner.spinner}></div>
              {UI_TEXT.inputForm.generatingText}
            </div>
          ) : (
            UI_TEXT.inputForm.generateButton
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
