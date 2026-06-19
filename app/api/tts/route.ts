import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const SARVAM_TTS = 'https://api.sarvam.ai/text-to-speech'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { text, language = 'hi-IN' } = await req.json()

  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'Text required' }, { status: 400 })
  }

  // Sarvam TTS max 500 chars per input
  const chunk = text.slice(0, 500)

  try {
    const res = await fetch(SARVAM_TTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-subscription-key': process.env.SARVAM_API_KEY!,
      },
      body: JSON.stringify({
        inputs: [chunk],
        target_language_code: language,
        speaker: 'meera',
        model: 'bulbul:v1',
        pitch: 0,
        pace: 1.0,
        loudness: 1.5,
        enable_preprocessing: true,
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Sarvam TTS error: ${err}`)
    }

    const data = await res.json()
    const audioBase64 = data.audios?.[0]

    if (!audioBase64) {
      throw new Error('No audio returned from TTS')
    }

    return NextResponse.json({ audio: audioBase64 })
  } catch (error) {
    console.error('[TTS ERROR]', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'TTS failed' },
      { status: 500 }
    )
  }
}
