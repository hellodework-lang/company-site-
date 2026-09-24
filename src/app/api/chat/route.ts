import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are the official AI assistant for NEXORA AI.

NEXORA AI provides website development, UI/UX design, website redesign, AI integration, AI agent development and business automation solutions.

Your job is to help website visitors understand NEXORA AI's services, explore how AI could be applied to their business, answer questions about the company and help visitors start a project.

Be professional, friendly, concise and useful.

Never invent company information, pricing, clients, case studies, statistics, guarantees or capabilities that are not present in the approved company knowledge base.

If information is unavailable, clearly say that you do not have that information and guide the user toward contacting NEXORA AI.

When a visitor describes their business, understand their situation and suggest practical areas where websites, AI, automation or redesign may help.

Do not guarantee revenue, growth, cost savings or business outcomes.

When appropriate, ask useful follow-up questions.

Examples:
What type of business do you run?
Do you already have a website?
What process currently takes the most manual effort?
What would you like AI to handle?
Do you currently use a CRM or other business tools?

When the user wants to start a project, guide them toward the project enquiry form.

Do not pretend to be a human employee.
Identify yourself as the NEXORA AI assistant when relevant.
Keep answers easy to understand and avoid unnecessary technical jargon unless the visitor asks for technical details.`;

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      // Fallback for development without API key
      return NextResponse.json({ 
        reply: "I am currently running in offline mode. Please configure the GEMINI_API_KEY in the backend to enable my full capabilities. You can still reach us through the contact form!" 
      });
    }

    // Format history for the model
    const contents = history.map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));
    
    // Add the new message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7
        }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
