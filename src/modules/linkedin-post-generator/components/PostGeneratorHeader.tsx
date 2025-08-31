import React from "react";
import { UI_TEXT, CSS_CLASSES } from "../constants/ui-constants";

export const PostGeneratorHeader: React.FC = () => {
  return (
    <div className={CSS_CLASSES.header.container}>
      <h1 className={CSS_CLASSES.header.title}>{UI_TEXT.header.title}</h1>
      <p className={CSS_CLASSES.header.description}>
        {UI_TEXT.header.description}
      </p>
    </div>
  );
};
