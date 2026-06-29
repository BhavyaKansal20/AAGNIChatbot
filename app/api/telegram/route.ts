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

    // Ensure we have a message and text
    if (!update || !update.message || !update.message.text) {
      return NextResponse.json({ ok: true })
    }

    const chatId = update.message.chat.id
    const userText = update.message.text

    // Tell Telegram we received the message to stop it from retrying immediately
    // Note: To send typing indicator, we need to fire and forget
    fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
    }).catch(console.error)

    // Call Sarvam AI
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userText },
    ]

    let aiResponse = 'Sorry, I am having trouble connecting to my brain right now.'

    try {
      const sarvamRes = await fetch(SARVAM_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': process.env.SARVAM_API_KEY || '',
        },
        body: JSON.stringify({
          model: 'sarvam-3b-chat-v0.5',
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
        console.error('[Telegram] Sarvam API Error:', await sarvamRes.text())
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
