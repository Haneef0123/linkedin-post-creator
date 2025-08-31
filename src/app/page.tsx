"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function LinkedInPostGenerator() {
  const [topic, setTopic] = useState("");

  const placeholderPost = `🚀 Just completed an incredible project that I'm excited to share with my network!

Over the past few weeks, I've been working on developing a comprehensive solution that tackles real-world challenges in our industry. The journey has been both rewarding and enlightening.

Key takeaways from this experience:
✅ The importance of continuous learning and adaptation
✅ Collaboration truly makes the difference
✅ Innovation happens when we step outside our comfort zones

I'm grateful for the opportunity to work with such talented professionals and look forward to applying these insights to future projects.

What's a recent project or achievement you're proud of? I'd love to hear about it in the comments! 👇

#Innovation #Growth #Learning #Teamwork #Success`;

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            LinkedIn Post Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create engaging LinkedIn posts that capture attention and drive meaningful conversations with your network.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Input Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Generate a Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label 
                  htmlFor="topic-input" 
                  className="text-sm font-medium text-foreground block"
                >
                  Enter your topic or idea
                </label>
                <Textarea
                  id="topic-input"
                  placeholder="e.g., 'My recent project success', 'Industry insights', 'Career milestone'..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>
              <Button 
                className="w-full h-12 text-base font-medium"
                disabled={!topic.trim()}
              >
                Generate LinkedIn Post
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Your LinkedIn Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Post Display Area */}
              <div className="relative">
                <div className="bg-muted/30 rounded-lg p-6 border-2 border-dashed border-muted-foreground/20">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {placeholderPost}
                  </div>
                </div>
              </div>

              {/* Copy Button */}
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="min-w-[200px] h-12 text-base font-medium"
                >
                  📋 Copy Post
                </Button>
              </div>

              {/* Post Stats/Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">387</div>
                    <div className="text-sm text-muted-foreground">Characters</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">67</div>
                    <div className="text-sm text-muted-foreground">Words</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-sm text-muted-foreground">Hashtags</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Tips Section */}
        <Card className="mt-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              💡 Tips for Great LinkedIn Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Content Structure</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Start with a hook to grab attention</li>
                  <li>• Use bullet points for easy reading</li>
                  <li>• Include a call-to-action</li>
                  <li>• Add relevant hashtags (3-5 max)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Engagement</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Ask questions to encourage comments</li>
                  <li>• Share personal experiences</li>
                  <li>• Use emojis strategically</li>
                  <li>• Post at optimal times (8-10 AM)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
