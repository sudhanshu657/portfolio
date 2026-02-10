import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

function fallbackIntentParser(userMessage) {
  const text = userMessage.toLowerCase()

  if (text.includes("scroll") && text.includes("project")) {
    return { type: "scroll", section: "projects", selector: null, value: null, content: "Scrolling to the projects section." }
  }
  if (text.includes("scroll") && text.includes("contact")) {
    return { type: "scroll", section: "contact", selector: null, value: null, content: "Scrolling to the contact section." }
  }
  if (text.includes("highlight") && text.includes("skill")) {
    return { type: "highlight", section: "skills", selector: "#skills", value: null, content: "Highlighting the skills section." }
  }
  if (text.includes("focus") && text.includes("hero")) {
    return { type: "focus", section: "hero", selector: "#hero", value: null, content: "Focusing on the hero section." }
  }
  if (text.includes("fill") && text.includes("email")) {
    return { type: "fill", section: "contact", selector: "input[type='email'], #email, .email-input", value: "user@example.com", content: "Filling your email in the contact form." }
  }
  if (text.includes("click") && text.includes("submit")) {
    return { type: "click", section: "contact", selector: "button[type='submit'], #submit, .submit-btn", value: null, content: "Clicking the submit button." }
  }

  return { type: "message", section: null, selector: null, value: null, content: "I’m not sure how to perform that action." }
}

export async function POST(req) {
  try {
    const { messages, pageContent } = await req.json()
    const lastUserMessage = messages[messages.length - 1]?.content || ""

    const prompt = `
You are an AI co-browsing assistant for a portfolio website.

Respond ONLY in valid JSON with this exact structure:
{
  "type": "scroll" | "click" | "highlight" | "fill" | "focus" | "message",
  "section": "hero" | "about" | "skills" | "projects" | "contact" | null,
  "selector": "valid CSS selector or null",
  "value": "string or null",
  "content": "short user-facing message"
}

Rules:
- Use "scroll" when navigating to sections.
- Use "highlight" to visually emphasize a section or element.
- Use "click" when the user wants to press a button or link.
- Use "fill" to enter data into inputs.
- Use "focus" to zoom or draw attention to a section.
- Do NOT return Markdown or explanations — ONLY raw JSON.

Website content:
${pageContent}

Conversation:
${JSON.stringify(messages)}
`

    try {
      const result = await model.generateContent(prompt)
      const text = result.response.text()

      let cleaned = text
      const firstCurly = cleaned.indexOf("{")
      const lastCurly = cleaned.lastIndexOf("}")
      if (firstCurly !== -1 && lastCurly !== -1 && lastCurly >= firstCurly) {
        cleaned = cleaned.slice(firstCurly, lastCurly + 1)
      } else {
        cleaned = cleaned.replace(/```(?:json)?\s*|```/g, "").trim()
      }

      const parsed = JSON.parse(cleaned)

      if (!parsed.type || !parsed.content) {
        throw new Error("Invalid AI response schema")
      }

      return NextResponse.json(parsed)
    } catch (aiError) {
      console.warn("⚠️ Gemini unavailable, using fallback:", aiError.message)
      const fallback = fallbackIntentParser(lastUserMessage)
      return NextResponse.json(fallback)
    }
  } catch (error) {
    console.error("❌ API ERROR:", error)
    return NextResponse.json(
      { type: "message", content: "⚠️ Server error. Please try again." },
      { status: 500 }
    )
  }
}