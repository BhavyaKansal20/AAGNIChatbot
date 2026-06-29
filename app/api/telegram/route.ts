import { NextRequest, NextResponse } from 'next/server'

const SARVAM_API = 'https://api.sarvam.ai/v1/chat/completions'
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
  try {
    const update = await req.json()

    // Ensure we have a message
    if (!update || !update.message) {
      return NextResponse.json({ ok: true })
    }

    const message = update.message
    const chatId = message.chat.id
    
    // Check if it's text or a photo
    const isPhoto = !!message.photo && message.photo.length > 0
    const hasText = !!message.text
    let userText = message.text || message.caption || 'Describe this image.'

    if (!isPhoto && !hasText) {
       return NextResponse.json({ ok: true })
    }

    // Tell Telegram we received the message to stop it from retrying immediately
    fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    }).catch(console.error)

    let aiResponse = 'Sorry, I am having trouble connecting to my brain right now.'
    let activeSystemPrompt = SYSTEM_PROMPT
    let skipAI = false

    // Command Router
    if (userText.startsWith('/')) {
      const firstWord = userText.split(' ')[0].toLowerCase()
      const commandArg = userText.slice(firstWord.length).trim()

      switch (firstWord) {
        case '/start':
          aiResponse = "Welcome to AAGNI AI! 🔥\n\nI am India's most advanced culturally aware AI. Send me text, photos, or use commands like `/help` to see what I can do."
          skipAI = true
          break
        case '/help':
          aiResponse = "Here is what I can do:\n\n/start - Wake up Aagni AI\n/code <question> - Switch to Expert Developer Mode\n/translate <language> <text> - Switch to Translation Mode\n/vision - Learn about image analysis\n/clear - Reset the conversation"
          skipAI = true
          break
        case '/vision':
          aiResponse = "To use my Vision capabilities, simply tap the attachment icon (📎) in Telegram, select a photo, and add a caption asking me to analyze it!"
          skipAI = true
          break
        case '/clear':
          aiResponse = "Memory cleared! Starting fresh. ✨"
          skipAI = true
          break
        case '/code':
          if (!commandArg && !isPhoto) {
            aiResponse = "Please provide what you want me to code. Example:\n`/code write a python loop`"
            skipAI = true
          } else {
            activeSystemPrompt = "You are a Senior Software Engineer. You output highly optimized, clean, and production-ready code. Skip pleasantries. Only provide the solution. Wrap code in markdown blocks."
            userText = commandArg || 'Analyze this image and write code for it.'
          }
          break
        case '/translate':
          if (!commandArg && !isPhoto) {
            aiResponse = "Please provide the language and text. Example:\n`/translate hindi How are you?`"
            skipAI = true
          } else {
            activeSystemPrompt = "You are an expert translator fluent in 22 Indian languages and global languages. Your ONLY job is to accurately translate the user's text into the requested language. Do not add any extra conversation."
            userText = commandArg ? `Translate the following to the specified language: ${commandArg}` : 'Translate the text in this image.'
          }
          break
      }
    }

    if (!skipAI) {
      try {
        if (isPhoto) {
          // --- VISION MODE (Gemini) ---
          // 1. Get the highest resolution photo
          const photo = message.photo[message.photo.length - 1]
          const fileId = photo.file_id

          // 2. Get file path from Telegram
          const fileInfoRes = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`)
          const fileInfo = await fileInfoRes.json()
          
          if (fileInfo.ok && fileInfo.result?.file_path) {
            const filePath = fileInfo.result.file_path
            
            // 3. Download the actual image
            const imageRes = await fetch(`https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`)
            const imageBuffer = await imageRes.arrayBuffer()
            const base64Data = Buffer.from(imageBuffer).toString('base64')
            const mimeType = filePath.endsWith('.png') ? 'image/png' : 'image/jpeg'

            let visionSuccess = false
            let lastError = ''
            
            // For Vision, we prepend the active system prompt if it changed, otherwise just use userText
            const finalVisionPrompt = activeSystemPrompt !== SYSTEM_PROMPT 
              ? `${activeSystemPrompt}\n\nUser Request: ${userText}` 
              : userText

            // Attempt 1: Gemini
            if (process.env.GEMINI_API_KEY) {
              try {
                const geminiRes = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY.trim()}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      contents: [
                        {
                          parts: [
                            { text: finalVisionPrompt },
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
                    aiResponse = geminiText
                    visionSuccess = true
                  } else {
                    lastError = 'Gemini returned empty text response.'
                  }
                } else {
                  lastError = `Gemini API failed (${geminiRes.status}): ${await geminiRes.text()}`
                }
              } catch (e: any) {
                lastError = `Gemini fetch exception: ${e.message}`
              }
            } else {
              lastError = 'No GEMINI_API_KEY available.'
            }

            // Attempt 2: OpenRouter Fallback
            if (!visionSuccess && process.env.OPENROUTER_API_KEY) {
              try {
                const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'https://aagni-ai.vercel.app',
                    'X-Title': 'Aagni AI Telegram',
                  },
                  body: JSON.stringify({
                    model: 'nvidia/nemotron-nano-12b-v2-vl:free',
                    messages: [
                      {
                        role: 'user',
                        content: [
                          { type: 'text', text: finalVisionPrompt },
                          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Data}` } },
                        ],
                      }
                    ],
                  }),
                })

                if (orRes.ok) {
                  const orData = await orRes.json()
                  const textContent = orData.choices?.[0]?.message?.content
                  if (textContent) {
                    aiResponse = textContent
                    visionSuccess = true
                  } else {
                    lastError += ' | OpenRouter empty.'
                  }
                } else {
                  lastError += ` | OpenRouter failed (${orRes.status}): ${await orRes.text()}`
                }
              } catch (e: any) {
                lastError += ` | OpenRouter exception: ${e.message}`
              }
            }

            if (!visionSuccess) {
              aiResponse = `All vision models failed. Error: ${lastError}`
            }
          } else {
             aiResponse = `Could not get file path from Telegram. Error: ${JSON.stringify(fileInfo)}`
          }

        } else {
          // --- TEXT MODE (Sarvam) ---
          const apiMessages = [
            { role: 'system', content: activeSystemPrompt },
            { role: 'user', content: userText },
          ]

        const sarvamRes = await fetch(SARVAM_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': process.env.SARVAM_API_KEY || '',
          },
          body: JSON.stringify({
            model: 'sarvam-30b',
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 1500,
          }),
        })

        if (sarvamRes.ok) {
          const data = await sarvamRes.json()
          if (data.choices?.[0]?.message?.content) {
            aiResponse = data.choices[0].message.content
          }
        } else {
          console.error('[Telegram Text] Sarvam API Error:', await sarvamRes.text())
        }
      }
    } catch (error) {
      console.error('[Telegram] Fetch Error:', error)
    }
    }

    // Send the response back to Telegram
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: aiResponse,
        parse_mode: 'Markdown', // Helps with code blocks and bold text
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[Telegram Webhook Error]', error)
    return NextResponse.json({ ok: true }) // Still return 200 so Telegram stops retrying
  }
}
