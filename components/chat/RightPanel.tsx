'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BrainCircuit, UploadCloud, Link as LinkIcon, CheckSquare, Bookmark, 
  Settings, Lock, Star, Zap, Network, Code2
} from 'lucide-react'

const TABS = [
  { id: 'memory', icon: BrainCircuit, label: 'Memory' },
  { id: 'tasks', icon: CheckSquare, label: 'Tasks' },
  { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

export function RightPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('memory')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full border-l border-white bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden hidden xl:flex shrink-0"
        >
          {/* Tabs Header */}
          <div className="flex border-b border-white/50 p-2 gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                    isActive ? 'bg-white/40 text-aagni-saffron shadow-sm' : 'text-[#1A1F3B]/50 hover:bg-white/20 hover:text-[#1A1F3B]'
                  }`}
                >
                  <Icon size={18} className="mb-1" />
                  <span className="text-[10px] font-medium tracking-wider">{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'memory' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-[#1A1F3B]/90">Memory & Context</h3>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-[#1A1F3B]/60 uppercase tracking-wider mb-2">Saved Preferences</p>
                      <div className="p-3 bg-white/40 backdrop-blur-md rounded-xl border border-white text-sm text-[#1A1F3B]/80">Prefers responses in Hindi and English.</div>
                      <div className="p-3 bg-white/40 backdrop-blur-md rounded-xl border border-white text-sm text-[#1A1F3B]/80">Senior developer building Next.js apps.</div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-[#1A1F3B]/60 uppercase tracking-wider mb-2">Recent Topics</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-white/40 backdrop-blur-md rounded-md text-xs text-[#1A1F3B]/80 border border-white">Quantum Computing</span>
                        <span className="px-2.5 py-1 bg-white/40 backdrop-blur-md rounded-md text-xs text-[#1A1F3B]/80 border border-white">React Hooks</span>
                        <span className="px-2.5 py-1 bg-white/40 backdrop-blur-md rounded-md text-xs text-[#1A1F3B]/80 border border-white">Vedic Math</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-[#1A1F3B]/60 uppercase tracking-wider mb-2">Custom Instructions</p>
                      <button className="w-full p-3 bg-aagni-saffron/10 border border-aagni-saffron/20 text-aagni-saffron rounded-xl text-sm font-medium hover:bg-aagni-saffron/20 transition-colors">
                        Edit Instructions
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'tasks' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-[#1A1F3B]/90">Agent Tasks</h3>
                    <div className="p-4 bg-white/40 backdrop-blur-md rounded-xl border border-white text-center">
                      <CheckSquare size={24} className="mx-auto text-[#1A1F3B]/40 mb-2" />
                      <p className="text-sm text-[#1A1F3B]/80">No active tasks</p>
                      <p className="text-xs text-[#1A1F3B]/60 mt-1">Agent jobs and automations will appear here.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'bookmarks' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-[#1A1F3B]/90">Bookmarks</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-white/40 backdrop-blur-md rounded-xl border border-white flex items-start gap-3 hover:bg-white/60 cursor-pointer transition-colors">
                        <Bookmark size={16} className="text-aagni-saffron shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-[#1A1F3B]/90 font-medium">Next.js Routing Guide</p>
                          <p className="text-xs text-[#1A1F3B]/60 truncate mt-1">Saved from yesterday's chat</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-[#1A1F3B]/90">Settings</h3>
                    
                    <div className="space-y-3">
                      <p className="text-xs font-medium text-[#1A1F3B]/60 uppercase tracking-wider">Theme</p>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="p-2 bg-white/40 rounded-lg border border-white text-xs text-[#1A1F3B]/80 hover:bg-white/60">Dark</button>
                        <button className="p-2 bg-white/60 rounded-lg border border-aagni-saffron/30 text-xs text-aagni-saffron font-bold shadow-sm relative overflow-hidden group">
                          <span className="relative z-10">AAGNI Aurora</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-aagni-indigo/10 to-aagni-softblue/10 group-hover:opacity-100 opacity-0 transition-opacity" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
