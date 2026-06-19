import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect, notFound } from 'next/navigation'
import { ChatInterface } from '@/components/chat/ChatInterface'

interface PageProps {
  params: { id: string }
}

export default async function ChatPage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const chat = await prisma.chat.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: {
      messages: { orderBy: { createdAt: 'asc' } },
    },
  })

  if (!chat) notFound()

  const messages = chat.messages.map((m) => ({
    id: m.id,
    role: m.role as 'user' | 'assistant' | 'system',
    content: m.content,
    imageUrl: m.imageUrl,
  }))

  return <ChatInterface chatId={params.id} initialMessages={messages} />
}
