import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '…' : str
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // If it's not an image, or we are not in browser, fallback to simple reader
    if (!file.type.startsWith('image/') || typeof window === 'undefined') {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
      return
    }

    // Compress image using Canvas
    const img = new Image()
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      URL.revokeObjectURL(url)
      
      const MAX_WIDTH = 1024
      const MAX_HEIGHT = 1024
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('Canvas not supported'))
        return
      }
      
      ctx.drawImage(img, 0, 0, width, height)
      // Quality 0.7 gives huge size savings with minimal visual loss for AI
      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }
    
    img.onerror = () => reject(new Error('Failed to load image for compression'))
    img.src = url
  })
}
