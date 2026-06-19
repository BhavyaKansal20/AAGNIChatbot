import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const chat = await prisma.chat.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!chat) {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
  }

  return NextResponse.json({ chat })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await prisma.chat.deleteMany({
    where: { id: params.id, userId: session.user.id },
  })

  return NextResponse.json({ success: true })
}
