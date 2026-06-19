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
          className="h-full border-l border-white/5 dark-glass-panel flex flex-col overflow-hidden hidden xl:flex shrink-0"
        >
          {/* Tabs Header */}
          <div className="flex border-b border-white/5 p-2 gap-1">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                    isActive ? 'bg-white/10 text-aagni-saffron' : 'text-aagni-muted hover:bg-white/5 hover:text-white'
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
                    <h3 className="text-sm font-semibold text-white/90">Memory & Context</h3>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-aagni-muted uppercase tracking-wider mb-2">Saved Preferences</p>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-sm text-white/80">Prefers responses in Hindi and English.</div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-sm text-white/80">Senior developer building Next.js apps.</div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-aagni-muted uppercase tracking-wider mb-2">Recent Topics</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/5">Quantum Computing</span>
                        <span className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/5">React Hooks</span>
                        <span className="px-2.5 py-1 bg-white/10 rounded-md text-xs text-white/80 border border-white/5">Vedic Math</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-aagni-muted uppercase tracking-wider mb-2">Custom Instructions</p>
                      <button className="w-full p-3 bg-aagni-saffron/10 border border-aagni-saffron/20 text-aagni-saffron rounded-xl text-sm font-medium hover:bg-aagni-saffron/20 transition-colors">
                        Edit Instructions
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'tasks' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-white/90">Agent Tasks</h3>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                      <CheckSquare size={24} className="mx-auto text-aagni-muted mb-2" />
                      <p className="text-sm text-white/80">No active tasks</p>
                      <p className="text-xs text-aagni-muted mt-1">Agent jobs and automations will appear here.</p>
                    </div>
                  </div>
                )}

                {activeTab === 'bookmarks' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-white/90">Bookmarks</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-start gap-3 hover:bg-white/10 cursor-pointer transition-colors">
                        <Bookmark size={16} className="text-aagni-saffron shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-white/90 font-medium">Next.js Routing Guide</p>
                          <p className="text-xs text-aagni-muted truncate mt-1">Saved from yesterday's chat</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-white/90">Settings & Upgrades</h3>
                    
                    <div className="space-y-3">
                      <p className="text-xs font-medium text-aagni-muted uppercase tracking-wider">Theme</p>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="p-2 bg-white/5 rounded-lg border border-white/10 text-xs text-white/80 hover:bg-white/10">Dark</button>
                        <button className="p-2 bg-white/5 rounded-lg border border-aagni-saffron/30 text-xs text-aagni-saffron bg-aagni-saffron/10 font-bold shadow-[0_0_15px_rgba(255,107,0,0.15)] relative overflow-hidden group">
                          <span className="relative z-10">AAGNI Aurora</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-aagni-indigo/50 to-aagni-softblue/20 group-hover:opacity-100 opacity-0 transition-opacity" />
                        </button>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/10" />

                    <div className="space-y-3">
                      <p className="text-xs font-medium text-aagni-saffron uppercase tracking-wider flex items-center gap-1">
                        <Star size={12} /> Pro Features
                      </p>
                      <div className="space-y-2">
                        {['Research Mode', 'Deep Search', 'Voice Cloning', 'Custom Memory', 'Team Workspace'].map(f => (
                          <div key={f} className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5 opacity-70">
                            <span className="text-sm text-white/80">{f}</span>
                            <Lock size={12} className="text-aagni-muted" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-medium text-blue-400 uppercase tracking-wider flex items-center gap-1">
                        <Zap size={12} /> Ultra Features
                      </p>
                      <div className="space-y-2">
                        {['Multi-Agent System', 'Long-Term Memory', 'Code Execution', 'Private Models'].map(f => (
                          <div key={f} className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/5 opacity-60">
                            <span className="text-sm text-white/80">{f}</span>
                            <Lock size={12} className="text-aagni-muted" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-aagni-saffron to-aagni-orange text-white font-bold rounded-xl shadow-[0_4px_15px_rgba(255,107,0,0.2)] hover:shadow-[0_6px_20px_rgba(255,107,0,0.3)] transition-all">
                      Upgrade to Pro
                    </button>
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
