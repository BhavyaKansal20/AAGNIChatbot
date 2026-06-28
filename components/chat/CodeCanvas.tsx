'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, X, Code2, FileCode } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlock {
  lang: string
  code: string
  title?: string
}

interface CodeCanvasProps {
  block: CodeBlock | null
  onClose: () => void
}

export function CodeCanvas({ block, onClose }: CodeCanvasProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!block) return
    await navigator.clipboard.writeText(block.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {block && (
        <motion.div
          initial={{ opacity: 0, x: 40, width: 0 }}
          animate={{ opacity: 1, x: 0, width: '45%' }}
          exit={{ opacity: 0, x: 40, width: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="h-full flex-shrink-0 overflow-hidden border-l border-aagni-border"
          style={{ minWidth: 340, maxWidth: 600 }}
        >
          <div className="h-full flex flex-col bg-aagni-panel">
            {/* Canvas header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-aagni-border">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-aagni-saffron/10 border border-aagni-saffron/20">
                  <FileCode size={14} className="text-aagni-saffron" />
                </div>
                <div>
                  <p className="text-[#1A1F3B] text-sm font-medium">
                    {block.title || 'Code Canvas'}
                  </p>
                  <p className="text-aagni-muted text-xs uppercase tracking-wider">
                    {block.lang || 'plaintext'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border border-aagni-saffron/30 bg-aagni-saffron/5 text-[#1A1F3B] hover:bg-aagni-saffron/10 transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} className="text-aagni-saffron" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-aagni-muted hover:text-[#1A1F3B] hover:bg-black/5 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Code content */}
            <div className="flex-1 overflow-auto">
              <SyntaxHighlighter
                language={block.lang || 'text'}
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{
                  margin: 0,
                  padding: '16px',
                  background: 'transparent',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  fontFamily: '"Courier New", Courier, monospace',
                  height: '100%',
                }}
                lineNumberStyle={{
                  color: '#4a4a6a',
                  paddingRight: '16px',
                  minWidth: '2.5em',
                }}
              >
                {block.code}
              </SyntaxHighlighter>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
