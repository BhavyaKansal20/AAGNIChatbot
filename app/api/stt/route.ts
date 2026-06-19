import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

const SARVAM_STT = 'https://api.sarvam.ai/speech-to-text-translate'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await req.formData()
  const audioFile = formData.get('file') as File

  if (!audioFile) {
    return NextResponse.json({ error: 'Audio file required' }, { status: 400 })
  }

  try {
    const sarvamForm = new FormData()
    sarvamForm.append('file', audioFile, 'recording.wav')
    sarvamForm.append('model', 'saarika:v2')
    sarvamForm.append('language_code', 'hi-IN')
    sarvamForm.append('with_timestamps', 'false')
    sarvamForm.append('with_disfluencies', 'false')
    sarvamForm.append('mode', 'offline')

    const res = await fetch(SARVAM_STT, {
      method: 'POST',
      headers: {
        'api-subscription-key': process.env.SARVAM_API_KEY!,
      },
      body: sarvamForm,
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Sarvam STT error: ${err}`)
    }

    const data = await res.json()
    const transcript = data.transcript || ''

    return NextResponse.json({ transcript })
  } catch (error) {
    console.error('[STT ERROR]', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'STT failed' },
      { status: 500 }
    )
  }
}
