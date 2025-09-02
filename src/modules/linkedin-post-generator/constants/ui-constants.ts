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
    animatedPlaceholders: [
      "Share your latest career milestone...",
      "Discuss industry trends and insights...",
      "Tell a story about overcoming challenges...",
      "Share tips from your professional experience...",
      "Announce a new project or achievement...",
      "Give advice to your professional network...",
      "Share lessons learned from failures...",
      "Discuss upcoming industry changes...",
      "Celebrate team accomplishments...",
      "Share your thoughts on work-life balance...",
      "Talk about a book that changed your perspective...",
      "Share networking tips that actually work...",
      "Discuss the future of remote work...",
      "Give career advice to your younger self...",
      "Share your morning routine for productivity...",
      "Talk about AI's impact on your industry...",
      "Share a mentor who inspired you...",
      "Discuss sustainable business practices...",
      "Share your biggest professional risk...",
      "Talk about innovation in your field...",
    ],
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
    container: "min-h-screen bg-background pt-10 pb-0 md:py-10 md:px-16",
    maxWidth: "max-w-screen-xl mx-auto w-full",
    grid: "flex flex-col gap-0 md:gap-6 md:px-0 lg:grid lg:grid-cols-2 lg:gap-6", // No gap on mobile, 24px on desktop
  },
  header: {
    container: "text-center mb-8 md:mb-12 px-4", // Keep header padding on mobile for text centering
    title:
      "text-2xl md:text-4xl font-semibold text-foreground mb-3 tracking-tight",
    description:
      "text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-6",
  },
  card: {
    base: "bg-[#f9f9f9] rounded-none md:rounded-xl p-4 md:p-6 w-full", // 16px padding on mobile, 24px on desktop
    inner: "", // No inner container needed
    tipsCard: "bg-[#f9f9f9] rounded-none md:rounded-xl p-4 md:p-6 w-full",
  },
  cardTitle: {
    large: "text-xl md:text-2xl font-semibold text-foreground mb-4 md:mb-6",
    medium: "text-lg md:text-xl font-semibold text-foreground mb-4 md:mb-6",
  },
  form: {
    container: "space-y-6", // Removed padding as it's handled by card.base
    fieldContainer: "space-y-3",
    label: "text-sm font-semibold text-foreground block",
    textarea:
      "min-h-[120px] resize-none bg-white border border-gray-200 text-foreground rounded-lg p-3 shadow-sm",
    button:
      "w-full h-12 text-sm font-bold transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg",
  },
  postDisplay: {
    container: "space-y-6", // Removed padding as it's handled by card.base
    postArea: "relative",
    postBox:
      "rounded-lg p-6 border transition-all duration-300 min-h-[200px] bg-white shadow-sm",
    postBoxGenerated: "border-gray-200",
    postBoxEmpty: "border-dashed border-gray-300",
    postText: "whitespace-pre-wrap leading-6 text-sm md:text-base",
    postTextGenerated: "text-foreground",
    postTextEmpty: "text-muted-foreground text-center italic",
    copyButtonContainer: "flex justify-center",
    copyButton:
      "min-w-[160px] h-12 text-sm font-bold transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg",
    copyButtonSuccess: "bg-green-600 text-white hover:bg-green-700",
    statsContainer: "bg-white rounded-lg p-4 border border-gray-200 shadow-sm",
    statsInner: "bg-card rounded-xl p-4",
    statsGrid: "grid grid-cols-3 gap-4 text-center",
    statItem: "p-2",
    statItemBorder: "p-2 border-x border-gray-200",
    statNumber: "text-xl md:text-2xl font-bold text-primary",
    statLabel: "text-xs md:text-sm text-muted-foreground font-medium",
  },
  spinner: {
    container: "flex items-center gap-2",
    spinner:
      "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin",
  },
  tips: {
    container: "", // Removed padding as it's handled by card.base
    grid: "grid gap-6 md:grid-cols-2",
    section: "space-y-3",
    sectionTitle:
      "font-semibold text-foreground text-base bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200",
    list: "space-y-2 text-sm text-muted-foreground leading-6 px-2",
    listItem: "flex items-start gap-2",
    bullet: "w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0",
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
