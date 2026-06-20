import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const SARVAM_API = 'https://api.sarvam.ai/v1/chat/completions'
const OPENROUTER_API = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `You are Aagni AI — a highly intelligent, culturally rich AI assistant built for India. 
Your name means "Fire" in Sanskrit. You are knowledgeable about Indian culture, history, languages, science, technology, and the modern world.
You respond in a warm, precise, and intelligent manner. You can speak in Hindi, English, or Hinglish depending on what the user prefers.
When generating code, always wrap it in proper markdown code blocks with the language specified.
Be helpful, accurate, and celebrate India's rich heritage while being globally knowledgeable.`

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { messages, chatId, imageData, incognito } = await req.json()
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Messages required' }, { status: 400 })
  }

  try {
    let aiResponse: string

    if (imageData) {
      // Vision mode — OpenRouter Free Model Fallback
      const visionMessages = [
        {
          role: 'user',
          content: [
            { type: 'text', text: messages[messages.length - 1]?.content || 'Describe this image.' },
            { type: 'image_url', image_url: { url: imageData } },
          ],
        },
      ]

      const orRes = await fetch(OPENROUTER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'HTTP-Referer': process.env.AUTH_URL || 'http://localhost:3000',
          'X-Title': 'Aagni AI',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.2-11b-vision-instruct:free',
          messages: visionMessages,
        }),
      })

      if (!orRes.ok) {
        const err = await orRes.text()
        throw new Error(`OpenRouter error: ${err}`)
      }

      const orData = await orRes.json()
      aiResponse = orData.choices?.[0]?.message?.content || 'No vision response.'
    } else {
      // Text mode — Sarvam
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map((m: any) => ({
          role: m.role,
          content: m.content,
        })),
      ]

      const sarvamRes = await fetch(SARVAM_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': process.env.SARVAM_API_KEY!,
        },
        body: JSON.stringify({
          model: 'sarvam-105b',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 2048,
        }),
      })

      if (!sarvamRes.ok) {
        const err = await sarvamRes.text()
        throw new Error(`Sarvam error: ${err}`)
      }

      const sarvamData = await sarvamRes.json()
      aiResponse = sarvamData.choices?.[0]?.message?.content || 'No response from Aagni.'
    }

    // Persist messages if chatId provided and not in incognito mode
    if (chatId && !incognito) {
      const userMessage = messages[messages.length - 1]
      await prisma.message.createMany({
        data: [
          {
            chatId,
            role: 'user',
            content: userMessage.content,
            imageUrl: imageData || null,
          },
          {
            chatId,
            role: 'assistant',
            content: aiResponse,
          },
        ],
      })

      // Auto-title chat from first user message
      const chat = await prisma.chat.findUnique({ where: { id: chatId } })
      if (chat && chat.title === 'New Chat') {
        const title = userMessage.content.slice(0, 60) || 'New Chat'
        await prisma.chat.update({ where: { id: chatId }, data: { title } })
      }
    }

    return NextResponse.json({ content: aiResponse })
  } catch (error) {
    console.error('[CHAT API ERROR]', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
