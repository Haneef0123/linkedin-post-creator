// UI Text Constants
export const UI_TEXT = {
  header: {
    title: "LinkedIn Post Generator",
    description:
      "Create engaging LinkedIn posts that capture attention and drive meaningful conversations with your network.",
  },
  inputForm: {
    title: "Generate a Post",
    label: "Enter your topic or idea",
    placeholder:
      "e.g., 'My recent project success', 'Industry insights', 'Career milestone'...",
    generateButton: "Generate LinkedIn Post",
    generatingText: "Generating...",
  },
  postDisplay: {
    title: "Your LinkedIn Post",
    placeholder:
      "🌟 Your generated LinkedIn post will appear here.\n\nEnter a topic above and click 'Generate LinkedIn Post' to get started!\n\nTip: Try typing 'ai over jobs' for a sample post.",
    copyButtonDefault: "📋 Copy Post",
    copyButtonSuccess: "✅ Copied!",
    stats: {
      characters: "Characters",
      words: "Words",
      hashtags: "Hashtags",
    },
  },
  tips: {
    title: "💡 Tips for Great LinkedIn Posts",
    sections: {
      contentStructure: {
        title: "Content Structure",
        items: [
          "Start with a hook to grab attention",
          "Use bullet points for easy reading",
          "Include a call-to-action",
          "Add relevant hashtags (3-5 max)",
        ],
      },
      engagement: {
        title: "Engagement",
        items: [
          "Ask questions to encourage comments",
          "Share personal experiences",
          "Use emojis strategically",
          "Post at optimal times (8-10 AM)",
        ],
      },
    },
  },
} as const;

// CSS Classes Constants
export const CSS_CLASSES = {
  layout: {
    container: "min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8",
    maxWidth: "max-w-6xl mx-auto",
    grid: "grid gap-8 lg:gap-12",
  },
  header: {
    container: "text-center mb-12 lg:mb-16",
    title: "text-4xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent",
    description:
      "text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed",
  },
  card: {
    base: "bg-card border border-border rounded-2xl shadow-xl backdrop-blur-sm",
    tipsCard: "mt-12 bg-card border border-border rounded-2xl shadow-xl backdrop-blur-sm",
  },
  cardTitle: {
    large: "text-2xl lg:text-3xl font-bold text-center",
    medium: "text-xl lg:text-2xl font-semibold text-center",
  },
  form: {
    container: "space-y-6 p-8",
    fieldContainer: "space-y-3",
    label: "text-sm font-semibold text-foreground",
    textarea: "min-h-[140px] resize-none bg-background border-2 border-border rounded-xl text-base focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200",
    button: "w-full h-14 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-all duration-200 shadow-lg hover:shadow-xl",
  },
  postDisplay: {
    container: "space-y-6 p-8",
    postArea: "relative",
    postBox: "rounded-xl p-8 border-2 transition-all duration-300 min-h-[200px]",
    postBoxGenerated: "bg-background border-border shadow-inner",
    postBoxEmpty: "bg-muted/20 border-dashed border-muted-foreground/30",
    postText: "whitespace-pre-wrap leading-relaxed text-base",
    postTextGenerated: "text-foreground",
    postTextEmpty: "text-muted-foreground text-center italic",
    copyButtonContainer: "flex justify-center pt-4",
    copyButton:
      "min-w-[220px] h-12 text-base font-semibold rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-4 focus:ring-secondary/20 transition-all duration-200 shadow-md hover:shadow-lg",
    copyButtonSuccess: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500/20",
    statsContainer: "bg-secondary/50 rounded-xl p-6 border border-secondary/20 backdrop-blur-sm",
    statsGrid: "grid grid-cols-3 gap-6 text-center",
    statItem: "p-3",
    statItemBorder: "p-3 border-x border-secondary/30",
    statNumber: "text-3xl font-bold text-primary",
    statLabel: "text-sm font-medium text-muted-foreground uppercase tracking-wide",
  },
  spinner: {
    container: "flex items-center justify-center gap-3",
    spinner:
      "w-5 h-5 border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full animate-spin",
  },
  tips: {
    grid: "grid lg:grid-cols-2 gap-8 p-8",
    section: "space-y-4",
    sectionTitle: "font-bold text-lg text-foreground",
    list: "space-y-3 text-sm text-muted-foreground",
    listItem: "flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/50",
    listIcon: "w-5 h-5 text-primary mt-0.5 flex-shrink-0",
  },
} as const;

// Component Configuration Constants
export const COMPONENT_CONFIG = {
  textarea: {
    id: "topic-input",
  },
  form: {
    minTopicLength: 1,
  },
  animation: {
    copySuccessTimeout: 2000,
    generationDelay: 1500,
  },
} as const;
