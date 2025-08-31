export interface PostTemplates {
  [key: string]: string;
}

export const postTemplates: PostTemplates = {
  "ai over jobs": `🤖 AI is transforming the job market, but is it really taking over our jobs?

After diving deep into this topic, here's what I've discovered:

The reality isn't as black and white as we think:

✅ AI is automating repetitive tasks
✅ New job categories are emerging (AI trainers, prompt engineers, data scientists)
✅ Human creativity and emotional intelligence remain irreplaceable
✅ The key is adaptation and continuous learning

Instead of fearing AI, we should:
📚 Upskill in AI-adjacent areas
🤝 Focus on human-centric skills
💡 Embrace AI as a collaborative tool
🚀 View change as opportunity

The future belongs to those who learn to work WITH AI, not against it.

What's your take on AI in the workplace? Are you adapting or resisting? 

#AI #FutureOfWork #DigitalTransformation #CareerDevelopment #Innovation`,

  "career growth": `🚀 Just hit a major career milestone and wanted to share some insights!

Looking back at my journey, here are the game-changers:

Key lessons learned:
✅ Consistency beats perfection every time
✅ Network before you need it
✅ Embrace challenges as growth opportunities
✅ Mentorship works both ways

The biggest breakthrough came when I realized:
Success isn't just about climbing the ladder - it's about building the ladder for others too.

My advice for anyone on their career journey:
📈 Set clear goals but stay flexible on the path
🎯 Focus on value creation, not just task completion
🤝 Invest in relationships, not just skills
💪 Take calculated risks

What's one piece of career advice that changed your trajectory? Drop it in the comments! 👇

#CareerGrowth #ProfessionalDevelopment #Leadership #Success #Networking`,

  innovation: `💡 Innovation isn't just about groundbreaking technology - it's about solving real problems creatively.

Today I want to share what I've learned about driving innovation:

The innovation mindset:
✅ Question everything, especially "how we've always done it"
✅ Fail fast, learn faster
✅ Listen to customers, not just data
✅ Collaborate across disciplines

Real innovation happens when:
🔍 You identify unmet needs
🎯 You focus on outcomes, not outputs
🚀 You're willing to iterate relentlessly
💪 You persist through the "valley of despair"

The most impactful innovations often seem obvious in hindsight, but took courage to pursue when nobody else believed.

Remember: Innovation is not a destination, it's a mindset.

What's the most innovative solution you've seen recently? Share your thoughts! 

#Innovation #Creativity #ProblemSolving #Technology #Business #Entrepreneurship`,

  default: `🌟 Excited to share some thoughts on {topic}!

This topic has been on my mind lately, and here's what I've been thinking:

Key insights:
✅ Every challenge is an opportunity in disguise
✅ Continuous learning is the key to staying relevant
✅ Collaboration amplifies individual strengths
✅ Taking action beats perfect planning

My perspective on {topic}:
The landscape is constantly evolving, and those who adapt and embrace change will thrive. It's not about having all the answers - it's about asking the right questions and being willing to learn.

What I've learned:
📚 Stay curious and keep learning
🤝 Build meaningful connections
💡 Share knowledge generously
🚀 Take calculated risks

The future belongs to those who are willing to grow, adapt, and contribute to their communities.

What are your thoughts on {topic}? I'd love to hear your perspective! 

#Growth #Learning #Professional #Innovation #Community`,
};

export const getPostTemplate = (topic: string): string => {
  const normalizedTopic = topic.toLowerCase().trim();

  if (normalizedTopic.includes("ai") && normalizedTopic.includes("job")) {
    return postTemplates["ai over jobs"];
  } else if (
    normalizedTopic.includes("career") ||
    normalizedTopic.includes("growth")
  ) {
    return postTemplates["career growth"];
  } else if (
    normalizedTopic.includes("innovation") ||
    normalizedTopic.includes("creative")
  ) {
    return postTemplates["innovation"];
  } else {
    return postTemplates["default"].replace(/{topic}/g, topic);
  }
};
