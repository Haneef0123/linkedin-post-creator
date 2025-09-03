"use client";

import React, { useState, useEffect } from "react";

interface EnvDebugInfo {
  useSecureAPI: boolean;
  serverSide: boolean;
  clientSide: boolean;
}

export default function PromptsAdmin() {
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [envDebug, setEnvDebug] = useState<EnvDebugInfo | null>(null);

  useEffect(() => {
    // Debug environment variables immediately
    const envInfo = {
      useSecureAPI: true,
      serverSide: typeof window === "undefined",
      clientSide: typeof window !== "undefined",
    };
    setEnvDebug(envInfo);
    console.log("Client-side environment debug:", envInfo);

    loadPrompt();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadPrompt = async () => {
    setLoading(true);
    try {
      // Use secure API route instead of direct Firebase access
      const response = await fetch(
        "/api/firebase/prompts?id=linkedin-viral-prompt"
      );

      if (response.ok) {
        const data = await response.json();
        setTemplate(data.template || getDefaultTemplate());
      } else {
        if (response.status === 403) {
          console.error("Permission denied - check Firestore security rules");
          alert(
            "Permission denied. Please check Firestore security rules or contact admin."
          );
        } else if (response.status === 404) {
          console.log("Prompt not found, using default template");
        } else {
          console.error("Error loading prompt:", response.statusText);
        }
        setTemplate(getDefaultTemplate());
      }
    } catch (error) {
      console.error("Error loading prompt:", error);
      setTemplate(getDefaultTemplate());
      alert(
        "Error loading prompt. Using default template. Make sure Firebase is configured correctly."
      );
    }
    setLoading(false);
  };

  const savePrompt = async () => {
    setSaving(true);
    try {
      // Use secure API route instead of direct Firebase access
      const response = await fetch("/api/firebase/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "linkedin-viral-prompt",
          template: template,
        }),
      });

      if (response.ok) {
        alert("Prompt saved successfully!");
      } else {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.error || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error saving prompt:", error);
      alert("Error saving prompt. Check your Firebase configuration.");
    }
    setSaving(false);
  };

  const getDefaultTemplate = () => {
    return `##**Role:**  
Content Strategist & Viral LinkedIn Copywriter  
##**Objective:**  
Generate a LinkedIn post that combines the language, hooks, and metrics of Rand Fishkin, Leila Hormozi, Hiten Shah, and Naval Ravikant's viral strategies, tailored for the topic "{{topic}}" to maximize engagement and virality.  
##**Context:**  
The prompt should empower a LinkedIn content generator (AI or human) to craft a post that uses a bold contrarian hook, actionable steps, personal anecdote, permission-giving tone, and clear call-to-action—reflecting the proven viral DNA of the four profiles analyzed.  
##**Instructions:**  
###**Instruction 1:**  
Begin with a counter-intuition hook challenging a prevailing belief related to "{{topic}}" (e.g., "Most people think [common belief about {{topic}}]—here's why that's killing real progress.").  
###**Instruction 2:**  
Provide a numbered list of 3–4 practical reframes or steps, each combining data insight or personal lesson (e.g., "1. Stop chasing hype: build modular prototypes first").  
###**Instruction 3:**  
Include a brief micro-story illustrating overcoming doubt or defying convention related to "{{topic}}", then close with a permission-granting call-to-action (e.g., "You have permission to ignore the hype—start shipping your own solutions today.").  
##**Notes:**  
- Note 1: Maintain an unapologetic, conversational tone.  
- Note 2: Integrate at least one statistic or data point to bolster authority.  
- Note 3: Use strategic formatting (line breaks, bold for emphasis) to enhance readability and scroll-stopping power.
##**Additional Requirements:**
- Tone: {{tone}}
- Length: {{length}}
- Target audience: {{targetAudience}}
- Include emojis: {{includeEmojis}}
- Include hashtags: {{includeHashtags}}
Return only the LinkedIn post content, nothing else.`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading prompt...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">
            Prompt Admin Panel
          </h1>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-4">
              Edit the LinkedIn post generation prompt template. Use
              placeholders like{" "}
              <code className="bg-gray-100 px-1 rounded">
                {"{"}topic{"}"}
              </code>
              ,{" "}
              <code className="bg-gray-100 px-1 rounded">
                {"{"}tone{"}"}
              </code>
              , etc.
            </p>

            {/* Debug Environment Variables */}
            {envDebug && (
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">
                  Environment Debug:
                </h3>
                <pre className="text-xs text-yellow-700">
                  {JSON.stringify(envDebug, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="template"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Prompt Template
            </label>
            {React.createElement("textarea", {
              id: "template",
              value: template,
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTemplate(e.target.value),
              className:
                "w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm",
              placeholder: `Enter your prompt template with {'{'}topic{'}'} and other placeholders...`,
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={savePrompt}
              disabled={saving || !template.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? "Saving..." : "Save Prompt"}
            </button>

            <button
              onClick={loadPrompt}
              disabled={loading}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              Reload
            </button>

            <button
              onClick={() => setTemplate(getDefaultTemplate())}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              Reset to Default
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              Available Placeholders:
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
              <div>
                <code>
                  {"{"}topic{"}"}
                </code>{" "}
                - User&apos;s topic input
              </div>
              <div>
                <code>
                  {"{"}tone{"}"}
                </code>{" "}
                - Selected tone
              </div>
              <div>
                <code>
                  {"{"}length{"}"}
                </code>{" "}
                - Desired length
              </div>
              <div>
                <code>
                  {"{"}targetAudience{"}"}
                </code>{" "}
                - Target audience
              </div>
              <div>
                <code>
                  {"{"}includeEmojis{"}"}
                </code>{" "}
                - Include emojis (Yes/No)
              </div>
              <div>
                <code>
                  {"{"}includeHashtags{"}"}
                </code>{" "}
                - Include hashtags (Yes/No)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
