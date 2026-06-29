import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const SARVAM_API = 'https://api.sarvam.ai/v1/chat/completions'
const OPENROUTER_API = 'https://openrouter.ai/api/v1/chat/completions'

const SYSTEM_PROMPT = `You are Aagni AI — a highly intelligent, culturally rich AI assistant built for India. 
Your name means "Fire" in Sanskrit. You are knowledgeable about Indian culture, history, languages, science, technology, and the modern world.
You must DEFAULT to speaking and replying in ENGLISH at all times.
You are fluent in 22 Indian languages. ONLY reply in Hindi, Hinglish, or other regional languages if the user explicitly types in that language or asks you to.
When generating code, always wrap it in proper markdown code blocks with the language specified.
Be helpful, accurate, and celebrate India's rich heritage while being globally knowledgeable.

SELF-AWARENESS & IDENTITY:
- You were developed by Bhavya Kansal, an AI Engineer, ML Researcher, and the Founder of MultiModex AI (refer to him using he/him pronouns).
- You are a sovereign AI designed to empower India's AI-first future.
- Your brain is powered by a multi-model architecture: you use Sarvam AI for deep text reasoning and understanding of Indian languages, and you use Google Gemini Vision for analyzing images.
- Your backend is built with Next.js 15, Prisma ORM, and hosted on Vercel.
- You operate natively on both the web and Telegram.
If asked about yourself or your creator, proudly share this information.`

export const dynamic = 'force-dynamic'

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
      // Vision mode
      const userMessageText = messages[messages.length - 1]?.content || 'Describe this image.'
      let aiResponseFromVision = ''

      // Attempt 1: Direct Gemini API (Lightning Fast & 100% Free Tier 15 RPM)
      let geminiFailReason = ''
      if (process.env.GEMINI_API_KEY) {
        try {
          const match = imageData.match(/^data:(image\/[a-zA-Z0-9\+\-]+);base64,(.+)$/)
          if (match) {
            const mimeType = match[1]
            const base64Data = match[2]

            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY.trim()}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [
                    {
                      parts: [
                        { text: userMessageText },
                        { inline_data: { mime_type: mimeType, data: base64Data } }
                      ]
                    }
                  ]
                })
              }
            )

            if (geminiRes.ok) {
              const gData = await geminiRes.json()
              const geminiText = gData.candidates?.[0]?.content?.parts?.[0]?.text
              if (geminiText) {
                aiResponseFromVision = geminiText
              } else {
                geminiFailReason = 'Gemini returned 200 OK but empty text.'
              }
            } else {
              const errText = await geminiRes.text()
              geminiFailReason = `Gemini HTTP ${geminiRes.status}: ${errText}`
              console.warn('[Vision] Direct Gemini API failed:', errText)
            }
          } else {
            geminiFailReason = 'Image data format did not match expected base64 regex.'
          }
        } catch (e: any) {
          geminiFailReason = `Gemini Exception: ${e.message}`
          console.warn('[Vision] Direct Gemini API threw error:', e.message)
        }
      } else {
        geminiFailReason = 'GEMINI_API_KEY is missing from environment variables.'
      }

      // Attempt 2: Fallback to OpenRouter (Slow / Broken free tier)
      if (!aiResponseFromVision) {
        const visionMessages = [
          {
            role: 'user',
            content: [
              { type: 'text', text: userMessageText },
              { type: 'image_url', image_url: { url: imageData } },
            ],
          },
        ]

        const freeVisionModels = [
          'nvidia/nemotron-nano-12b-v2-vl:free',
          'meta-llama/llama-3.2-11b-vision-instruct:free' // fallback just in case
        ]

        let orData = null
        let lastError = ''

        for (const modelSlug of freeVisionModels) {
          try {
            const orRes = await fetch(OPENROUTER_API, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'HTTP-Referer': process.env.AUTH_URL || 'http://localhost:3000',
                'X-Title': 'Aagni AI',
              },
              body: JSON.stringify({
                model: modelSlug,
                messages: visionMessages,
              }),
            })

            if (orRes.ok) {
              orData = await orRes.json()
              const textContent = orData.choices?.[0]?.message?.content
              if (textContent) {
                aiResponseFromVision = textContent
                break // Success! Exit the loop
              } else {
                lastError = 'Model returned 200 OK but empty content.'
                console.warn(`[Vision] Model ${modelSlug} returned empty content.`)
              }
            } else {
              const errText = await orRes.text()
              console.warn(`[Vision] Model ${modelSlug} failed:`, errText)
              lastError = errText
            }
          } catch (e: any) {
            console.warn(`[Vision] Model ${modelSlug} threw error:`, e.message)
            lastError = e.message
          }
        }

        if (!aiResponseFromVision) {
          aiResponseFromVision = `No vision response. Gemini Error: ${geminiFailReason} | OpenRouter Error: ${lastError}`
        }
      }
      
      aiResponse = aiResponseFromVision
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
          model: 'sarvam-30b',
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
