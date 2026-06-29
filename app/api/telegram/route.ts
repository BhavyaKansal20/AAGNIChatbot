import { NextRequest, NextResponse } from 'next/server'

const SARVAM_API = 'https://api.sarvam.ai/v1/chat/completions'
const SYSTEM_PROMPT = `You are Aagni AI — a highly intelligent, culturally rich AI assistant built for India. 
Your name means "Fire" in Sanskrit. You are knowledgeable about Indian culture, history, languages, science, technology, and the modern world.
You respond in a warm, precise, and intelligent manner. You can speak in Hindi, English, or Hinglish depending on what the user prefers.
When generating code, always wrap it in proper markdown code blocks with the language specified.
Be helpful, accurate, and celebrate India's rich heritage while being globally knowledgeable.`

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
    const userText = message.text || message.caption || 'Describe this image.'

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

          // 4. Send to Gemini
          if (process.env.GEMINI_API_KEY) {
            const geminiRes = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY.trim()}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents: [
                    {
                      parts: [
                        { text: userText },
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
              } else {
                aiResponse = 'Gemini returned empty text response.'
              }
            } else {
              const errText = await geminiRes.text()
              aiResponse = `Gemini API failed (${geminiRes.status}): ${errText}`
            }
          } else {
            aiResponse = 'I cannot process images right now because my Gemini vision core is missing (No GEMINI_API_KEY).'
          }
        } else {
           aiResponse = `Could not get file path from Telegram. Error: ${JSON.stringify(fileInfo)}`
        }

      } else {
        // --- TEXT MODE (Sarvam) ---
        const apiMessages = [
          { role: 'system', content: SYSTEM_PROMPT },
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
