'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageSquare, Mic, Headphones, Bot, Eye, FileText, Sparkles,
  Play, StopCircle, RefreshCw, Download, Copy
} from 'lucide-react'

const TABS = [
  { id: 'chat', label: 'AI Chat', icon: MessageSquare },
  { id: 'tts', label: 'Text to Speech', icon: Mic },
  { id: 'stt', label: 'Speech to Text', icon: Headphones },
  { id: 'agents', label: 'Voice Agents', icon: Bot },
  { id: 'vision', label: 'Vision AI', icon: Eye },
  { id: 'doc', label: 'Document AI', icon: FileText },
  { id: 'more', label: 'More Coming Soon', icon: Sparkles },
]

export function InteractiveDashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-20 mb-32">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-aagni-indigo font-serif mb-4">
          The AI Platform India Talks To
        </h2>
        <p className="text-lg text-aagni-indigo/60 font-medium max-w-2xl mx-auto">
          Built on frontier-grade multilingual AI infrastructure.<br/>
          Chat, Speak, Listen, Understand, and Act — all from one platform.
        </p>
      </div>

      <div className="glass-card-light rounded-[32px] overflow-hidden flex flex-col min-h-[600px] border border-aagni-indigo/5 shadow-[0_20px_60px_-15px_rgba(35,41,77,0.08)]">
        {/* Tab Header */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-aagni-indigo/5 bg-white/40">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-5 min-w-max transition-all duration-300 relative ${
                  isActive ? 'text-aagni-saffron bg-white/60' : 'text-aagni-indigo/50 hover:text-aagni-indigo hover:bg-white/30'
                }`}
              >
                <Icon size={18} />
                <span className="font-semibold text-sm tracking-wide">{tab.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-aagni-saffron to-aagni-orange" 
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 bg-white/20 relative p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full flex flex-col lg:flex-row gap-8"
            >
              {activeTab === 'chat' && (
                <>
                  <div className="flex-1 bg-white/70 rounded-2xl p-6 shadow-sm border border-aagni-indigo/5 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-6">
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-br from-aagni-indigo to-[#3a447a] text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] shadow-sm">
                          <p>Explain Quantum Computing in simple Hindi.</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-aagni-cream border border-aagni-indigo/10 text-aagni-indigo px-5 py-4 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm">
                          <p className="font-medium text-aagni-saffron mb-2">AAGNI</p>
                          <p className="leading-relaxed">Quantum Computing ek advanced computing technology hai jo quantum mechanics ke principles par kaam karti hai. Jaise normal computers bits (0 ya 1) use karte hain, quantum computers 'qubits' use karte hain jo ek hi waqt par 0 aur 1 dono ho sakte hain...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-80 flex flex-col gap-4">
                    <div className="bg-white/70 rounded-2xl p-6 shadow-sm border border-aagni-indigo/5">
                      <h4 className="font-bold text-aagni-indigo mb-4">Model Information</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-aagni-cream rounded-xl border border-aagni-saffron/30 flex justify-between items-center">
                          <span className="font-semibold text-aagni-saffron">AAGNI Mini</span>
                          <span className="text-xs px-2 py-1 bg-aagni-saffron/10 text-aagni-saffron rounded-md">Active</span>
                        </div>
                        <div className="p-3 bg-black/50 rounded-xl border border-black/5 flex justify-between items-center opacity-60">
                          <span className="font-medium text-aagni-indigo">AAGNI Pro</span>
                          <span className="text-xs px-2 py-1 bg-black/5 text-aagni-indigo/60 rounded-md">Soon</span>
                        </div>
                        <div className="p-3 bg-black/50 rounded-xl border border-black/5 flex justify-between items-center opacity-60">
                          <span className="font-medium text-aagni-indigo">AAGNI Ultra</span>
                          <span className="text-xs px-2 py-1 bg-black/5 text-aagni-indigo/60 rounded-md">Soon</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-aagni-saffron/10 to-aagni-orange/5 rounded-2xl p-6 shadow-sm border border-aagni-saffron/20">
                      <p className="text-xs font-bold text-aagni-saffron uppercase tracking-wider mb-2">Infrastructure</p>
                      <p className="text-sm text-aagni-indigo font-medium">Powered by state-of-the-art Indian foundation models and proprietary AAGNI orchestration systems.</p>
                      <p className="text-xs text-aagni-indigo/60 mt-3 pt-3 border-t border-aagni-saffron/10">Sarvam 105B as core | fine tuned llama models and more</p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'tts' && (
                <div className="w-full flex flex-col items-center justify-center text-aagni-indigo/50 min-h-[400px]">
                  <Mic size={48} className="mb-4 text-aagni-saffron/50" />
                  <p className="text-lg font-medium">Text to Speech Interface</p>
                  <p className="text-sm">Multilingual voice generation capabilities.</p>
                </div>
              )}

              {activeTab === 'stt' && (
                <div className="w-full flex flex-col items-center justify-center text-aagni-indigo/50 min-h-[400px]">
                  <Headphones size={48} className="mb-4 text-aagni-saffron/50" />
                  <p className="text-lg font-medium">Speech to Text Interface</p>
                  <p className="text-sm">Real-time multilingual transcription.</p>
                </div>
              )}

              {activeTab === 'agents' && (
                <div className="w-full flex flex-col items-center justify-center text-aagni-indigo/50 min-h-[400px]">
                  <Bot size={48} className="mb-4 text-aagni-saffron/50" />
                  <p className="text-lg font-medium">Voice Agents</p>
                  <p className="text-sm">Customer support, booking, and sales agents.</p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="w-full flex flex-col items-center justify-center text-aagni-indigo/50 min-h-[400px]">
                  <Eye size={48} className="mb-4 text-aagni-saffron/50" />
                  <p className="text-lg font-medium">Vision AI</p>
                  <p className="text-sm">OCR, Image understanding, and visual QA.</p>
                </div>
              )}

              {activeTab === 'doc' && (
                <div className="w-full flex flex-col items-center justify-center text-aagni-indigo/50 min-h-[400px]">
                  <FileText size={48} className="mb-4 text-aagni-saffron/50" />
                  <p className="text-lg font-medium">Document AI</p>
                  <p className="text-sm">PDF extraction, invoice parsing, and search.</p>
                </div>
              )}

              {activeTab === 'more' && (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {['AI Agents', 'Long Memory', 'Research Mode', 'Browser Tools', 'Team Workspaces', 'Custom Models'].map((item, i) => (
                    <div key={i} className="bg-white/60 p-6 rounded-2xl border border-aagni-indigo/10 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-aagni-saffron/10 flex items-center justify-center text-aagni-saffron">
                        <span className="font-bold text-sm">✓</span>
                      </div>
                      <span className="font-semibold text-aagni-indigo">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
