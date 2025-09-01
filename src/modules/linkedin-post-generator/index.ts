// Main component
export { LinkedInPostGenerator } from "./LinkedInPostGenerator";

// Individual components
export { PostGeneratorHeader } from "./components/PostGeneratorHeader";
export { PostInputForm } from "./components/PostInputForm";
export { PostDisplay } from "./components/PostDisplay";
export { PostTipsSection } from "./components/PostTipsSection";

// Hooks
export { usePostGenerator } from "./hooks/use-post-generator";
export type { PostStats } from "./hooks/use-post-generator";

// Data
export { postTemplates, getPostTemplate } from "./data/post-templates";
export type { PostTemplates } from "./data/post-templates";

// Constants
export {
  UI_TEXT,
  CSS_CLASSES,
  COMPONENT_CONFIG,
} from "./constants/ui-constants";

// API types for external usage
export type { PostGeneratorOptions } from "@/types/api.types";
