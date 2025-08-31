import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UI_TEXT, CSS_CLASSES } from "../constants/ui-constants";

const CheckIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor" 
    className={CSS_CLASSES.tips.listIcon}
  >
    <path 
      fillRule="evenodd" 
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" 
      clipRule="evenodd" 
    />
  </svg>
);

export const PostTipsSection: React.FC = () => {
  return (
    <Card className={CSS_CLASSES.card.tipsCard}>
      <CardHeader>
        <CardTitle className={CSS_CLASSES.cardTitle.medium}>
          {UI_TEXT.tips.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={CSS_CLASSES.tips.grid}>
          <div className={CSS_CLASSES.tips.section}>
            <h3 className={CSS_CLASSES.tips.sectionTitle}>
              {UI_TEXT.tips.sections.contentStructure.title}
            </h3>
            <ul className={CSS_CLASSES.tips.list}>
              {UI_TEXT.tips.sections.contentStructure.items.map(
                (item, index) => (
                  <li key={index} className={CSS_CLASSES.tips.listItem}>
                    <CheckIcon />
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
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
