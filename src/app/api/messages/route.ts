// app/api/messages/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:  process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { creator, startup } = await req.json();
console.log(startup,'thisthestartup')
    // AI prompt — you can tweak tone and style
    const prompt = `
You are helping a startup write a TikTok outreach message.
Startup: ${startup.company_name} - ${startup.description}

Creator: ${creator.name} - ${creator.followers} followers - niche: ${creator.niche}
Bio: ${creator.bio}
Top Video: ${creator.top_video_title || "N/A"} (${creator.top_video_views || 0} views)

Write a short, friendly outreach message for the startup to send to the creator on TikTok.
`;

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const message = aiResponse.choices[0]?.message?.content || "";

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Message generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate message" },
      { status: 500 }
    );
  }
}
