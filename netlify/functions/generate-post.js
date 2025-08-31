export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      topic,
      tone = "professional",
      length = "medium",
      includeHashtags = true,
      includeEmojis = false,
      targetAudience = "professionals",
    } = req.body;

    // Validate input
    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return res.status(400).json({ error: "Topic is required" });
    }

    // Rate limiting - simple implementation
    const clientIP =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    // You can implement Redis-based rate limiting here for production

    // Build prompt
    const lengthGuide = {
      short: "100-150 words",
      medium: "150-250 words",
      long: "250-400 words",
    };

    const prompt = `Create a compelling LinkedIn post about: ${topic.trim()}

Requirements:
- Tone: ${tone}
- Length: ${lengthGuide[length]}
- Target audience: ${targetAudience}
- Include emojis: ${includeEmojis ? "Yes" : "No"}
- Include hashtags: ${
      includeHashtags ? "Yes, add 5-8 relevant hashtags at the end" : "No"
    }

Structure:
1. Start with an engaging hook
2. Provide valuable insights or information
3. Include a call-to-action
4. Keep it authentic and professional

Return only the LinkedIn post content, nothing else.`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!generatedContent) {
      throw new Error("No content generated");
    }

    return res.status(200).json({
      success: true,
      content: generatedContent,
    });
  } catch (error) {
    console.error("Function error:", error);
    return res.status(500).json({
      error: "Failed to generate post. Please try again.",
    });
  }
}
