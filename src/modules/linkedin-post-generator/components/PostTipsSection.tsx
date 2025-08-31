import React from "react";
import { UI_TEXT, CSS_CLASSES } from "../constants/ui-constants";

export const PostTipsSection: React.FC = () => {
  return (
    <div className={CSS_CLASSES.card.base}>
      <h2 className={CSS_CLASSES.cardTitle.medium}>{UI_TEXT.tips.title}</h2>
      <div className={CSS_CLASSES.tips.grid}>
        <div className={CSS_CLASSES.tips.section}>
          <h3 className={CSS_CLASSES.tips.sectionTitle}>
            {UI_TEXT.tips.sections.contentStructure.title}
          </h3>
          <ul className={CSS_CLASSES.tips.list}>
            {UI_TEXT.tips.sections.contentStructure.items.map(
              (item, index) => (
                <li key={index} className={CSS_CLASSES.tips.listItem}>
                  <div className={CSS_CLASSES.tips.bullet} />
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>
        </div>
        <div className={CSS_CLASSES.tips.section}>
          <h3 className={CSS_CLASSES.tips.sectionTitle}>
            {UI_TEXT.tips.sections.engagement.title}
          </h3>
          <ul className={CSS_CLASSES.tips.list}>
            {UI_TEXT.tips.sections.engagement.items.map((item, index) => (
              <li key={index} className={CSS_CLASSES.tips.listItem}>
                <div className={CSS_CLASSES.tips.bullet} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
