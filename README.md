<div align="center">
  <img src="https://aagni-ai.vercel.app/logo.png" alt="Aagni AI Logo" width="150"/>
  <h1>🔥 Aagni AI</h1>
  <p><strong>India's Most Advanced Sovereign Multimodal AI Assistant</strong></p>

  [![Website](https://img.shields.io/badge/Website-Live-brightgreen?style=for-the-badge)](https://aagni-ai.vercel.app)
  [![Telegram](https://img.shields.io/badge/Telegram-Bot-blue?style=for-the-badge&logo=telegram)](https://t.me/AagniAIbot)
  [![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](#)
</div>

---

A production-ready, premium multimodal AI assistant for India — powered by **Sarvam AI** for deep text reasoning & native Indian language understanding, and **Google Gemini / OpenRouter** for vision. Built with Next.js 15, Prisma ORM, Framer Motion, and a beautifully crafted saffron glassmorphism UI.

## 🚀 Live Demos

*   **🌐 Web Platform:** [https://aagni-ai.vercel.app](https://aagni-ai.vercel.app)
*   **🤖 Telegram Bot:** [https://t.me/AagniAIbot](https://t.me/AagniAIbot)

---

## 🎯 Key Features

| Feature | Description | Implementation |
|---|---|---|
| **Deep Reasoning** | Advanced conversational AI | Sarvam AI `sarvam-30b` model |
| **Vision & Image** | Analyzes photos via chat or Telegram | Google Gemini 2.5 Flash / OpenRouter |
| **Telegram Sync** | Custom Webhook Router with Slash commands | `/code`, `/translate`, `/vision`, `/start` |
| **Voice Input/Output** | Talk directly to AAGNI in Hindi/English | Sarvam STT & TTS |
| **Code Canvas** | Beautiful side-panel for generated code | `react-markdown` + syntax highlighting |
| **Secure Auth** | Seamless login via Google or GitHub | NextAuth.js v5 |
| **Memory** | Persistent sessions and chat history | PostgreSQL + Prisma ORM |
| **Premium UI** | Stunning animations and glassmorphism | Framer Motion + Tailwind CSS |

---

## 🏗️ Project Architecture

```
aagni-ai/
├── app/
│   ├── (auth)/login/page.tsx         ← OAuth Login (Google & GitHub)
│   ├── (dashboard)/chat/[id]/        ← Main Web Chat Interface
│   └── api/
│       ├── chat/route.ts             ← Sarvam text + Gemini vision API
│       └── telegram/route.ts         ← Telegram Webhook + Command Router
├── components/
│   ├── chat/ChatInterface.tsx        ← Orchestrates the web chat UX
│   └── effects/AagniOrb.tsx          ← Animated fire orb UI
├── prisma/schema.prisma              ← PostgreSQL DB schema (User, Chat, Message)
└── tailwind.config.js                ← Saffron & Gold aesthetic tokens
```

---

## ⚙️ Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/BhavyaKansal20/AAGNIChatbot.git
cd AAGNIChatbot
npm install
```

### 2. Configure Environment Variables
Copy the example file and populate it with your keys:
```bash
cp .env.local.example .env.local
```

You will need keys for:
*   **PostgreSQL URL:** (Neon, Supabase, etc.)
*   **NextAuth Secret:** (`openssl rand -base64 32`)
*   **OAuth:** Google and GitHub Client IDs/Secrets
*   **AI Models:** Sarvam API Key, Gemini API Key, OpenRouter API Key
*   **Telegram:** Bot Token

### 3. Initialize Database
```bash
npx prisma generate
npx prisma db push
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel

AAGNI AI is heavily optimized for edge deployment on Vercel.

1. Connect your GitHub repository to Vercel.
2. Add all the variables from `.env.local` to the Vercel Environment Variables settings.
3. Deploy!

**Setting up the Telegram Webhook:**
After deploying to Vercel, link your Telegram bot by opening this URL in your browser:
`https://api.telegram.org/bot<YOUR_TELEGRAM_TOKEN>/setWebhook?url=https://<YOUR_VERCEL_DOMAIN>/api/telegram`

---

## 🇮🇳 Built with Pride in India

**AAGNI AI** was conceptualized and developed by **Bhavya Kansal** (AI Engineer, ML Researcher, and Founder of MultiModex AI). 

> Designed to empower India's AI-first future.
