export interface IndustryTemplates {
  [industry: string]: string[];
}

export interface PostTemplates {
  industries: IndustryTemplates;
  default: string[];
}

export const postTemplates: PostTemplates = {
  industries: {
    tech: [
      "AI-powered [product] is revolutionizing [industry] by [specific benefit]",
      "3 emerging trends in [technology field] every professional should watch in 2025",
      "Implementing [new tech] - lessons learned from real-world deployment",
    ],
    finance: [
      "Navigating [new regulation/policy] - key implications for [specific financial sector]",
      "Wealth management strategies for [current economic condition] environments",
      "Decoding cryptocurrency trends for traditional finance professionals",
    ],
    healthcare: [
      "Innovations in [medical technology] - improving patient outcomes through [specific application]",
      "[Healthcare trend] - opportunities and challenges for practitioners in 2025",
      "Telemedicine best practices for [specific patient population]",
    ],
    consulting: [
      "Building resilient organizations - 5 strategies for [specific business challenge]",
      "[Industry] transformation roadmap - key considerations for sustainable growth",
      "Change management strategies for digital transformation initiatives",
    ],
  },
  default: [
    "[topic] - key insights and actionable strategies for professionals",
    "Breaking down complex [topic] concepts for better decision-making",
    "The future of [topic] - opportunities and challenges ahead",
  ],
};

export const getPostTemplate = (industry: string, topic: string): string => {
  const industryTemplates =
    postTemplates.industries[industry.toLowerCase()] || [];
  const availableTemplates = [...industryTemplates, ...postTemplates.default];
  const template =
    availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
  return template.replace(/\[topic\]/g, topic);
};
