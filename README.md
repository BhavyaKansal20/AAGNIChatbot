# 🔥 Aagni AI — India's Intelligent Assistant

> A production-ready, premium multimodal AI assistant for India — powered by **Sarvam AI** for text & voice, and **OpenRouter (Gemini)** for vision. Built with Next.js 15, NextAuth, PostgreSQL, Framer Motion, and a deep saffron glassmorphism UI.

---

## 🏗️ Project Structure

```
aagni-ai/
├── app/
│   ├── layout.tsx                    ← Root layout + font + metadata
│   ├── globals.css                   ← Global styles + glassmorphism
│   ├── page.tsx                      ← Root page (auth-gated)
│   ├── (auth)/login/page.tsx         ← Login page (Google + GitHub)
│   ├── (dashboard)/
│   │   ├── layout.tsx                ← Dashboard layout with Sidebar
│   │   ├── page.tsx                  ← Home (new chat)
│   │   └── chat/[id]/page.tsx        ← Chat session page
│   └── api/
│       ├── auth/[...nextauth]/       ← NextAuth handler
│       ├── chat/route.ts             ← Sarvam text + OpenRouter vision
│       ├── tts/route.ts              ← Sarvam TTS (voice output)
│       ├── stt/route.ts              ← Sarvam STT (voice input)
│       └── sessions/
│           ├── route.ts              ← GET all chats, POST new chat
│           └── [id]/route.ts         ← GET chat+messages, DELETE chat
├── components/
│   ├── effects/AagniOrb.tsx          ← Animated fire orb + waveform
│   ├── ui/IndianIcons.tsx            ← Om, Lotus, Diya, Chakra SVGs
│   ├── chat/
│   │   ├── ChatInterface.tsx         ← Main chat orchestrator
│   │   ├── MessageBubble.tsx         ← User/AI message with markdown
│   │   ├── ChatInput.tsx             ← Text + image + voice input
│   │   ├── CodeCanvas.tsx            ← Side panel for code artifacts
│   │   └── EmptyState.tsx            ← Welcome screen with suggestions
│   ├── layout/Sidebar.tsx            ← Chat history sidebar
│   └── providers/SessionProvider.tsx ← NextAuth session wrapper
├── lib/
│   ├── auth.ts                       ← NextAuth config (Google + GitHub)
│   ├── prisma.ts                     ← Prisma client singleton
│   └── utils.ts                      ← cn(), formatDate(), fileToBase64()
├── prisma/schema.prisma              ← DB schema (User, Chat, Message)
├── middleware.ts                     ← Route protection via NextAuth
├── types/next-auth.d.ts              ← Session type augmentation
├── tailwind.config.js                ← Custom colors + animations
└── .env.local.example                ← All required environment variables
```

---

## ⚙️ Setup Instructions

### Step 1 — Clone and Install

```bash
git clone <your-repo-url> aagni-ai
cd aagni-ai
npm install
```

### Step 2 — Configure Environment

```bash
cp .env.local.example .env.local
```

Fill in `.env.local`:

```env
# PostgreSQL (use Supabase, Neon, or Railway for free)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/aagni_ai?schema=public"

# Generate with: openssl rand -base64 32
AUTH_SECRET="your-secret-here"
AUTH_URL="http://localhost:3000"

# Google OAuth → console.cloud.google.com
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."

# GitHub OAuth → github.com/settings/apps
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."

# Sarvam AI → sarvam.ai/dashboard
SARVAM_API_KEY="..."

# OpenRouter → openrouter.ai/keys
OPENROUTER_API_KEY="..."
```

### Step 3 — Setup Database

```bash
# Push schema to PostgreSQL
npm run db:push

# Generate Prisma client
npm run db:generate

# Optional: Open Prisma Studio to inspect data
npm run db:studio
```

### Step 4 — Setup OAuth Providers

**Google OAuth:**
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project → Enable "Google+ API"
3. Go to Credentials → Create OAuth 2.0 Client ID
4. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Secret to `.env.local`

**GitHub OAuth:**
1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. New OAuth App → Set callback URL: `http://localhost:3000/api/auth/callback/github`
3. Copy Client ID and Secret to `.env.local`

### Step 5 — Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🔥

---

## 🎯 Features

| Feature | Implementation |
|---|---|
| **Text Chat** | Sarvam AI `sarvam-105b` model |
| **Voice Input** | Sarvam STT `saarika:v2`, `hi-IN` |
| **Voice Output** | Sarvam TTS `bulbul:v1`, speaker `meera` |
| **Image Vision** | OpenRouter + Gemini Flash 1.5 Exp |
| **Code Canvas** | Side-panel with syntax highlighting |
| **Auth** | NextAuth v5, Google + GitHub OAuth |
| **Chat History** | PostgreSQL via Prisma, persistent sessions |
| **Markdown** | `react-markdown` + `remark-gfm` |
| **Animations** | Framer Motion throughout |
| **Design** | Glassmorphism, saffron/gold palette, Times New Roman |
| **Mobile** | Fully responsive, sidebar collapses on mobile |

---

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel Dashboard
# Settings → Environment Variables → add all from .env.local
```

For production OAuth callbacks, replace `http://localhost:3000` with your Vercel URL in:
- Google Console → Authorized redirect URIs
- GitHub OAuth App → Authorization callback URL

---

## 🔑 API Reference

### `POST /api/chat`
```json
{
  "messages": [{ "role": "user", "content": "Hello" }],
  "chatId": "optional-existing-chat-id",
  "imageData": "optional-base64-image-string"
}
```

### `POST /api/tts`
```json
{ "text": "नमस्ते! मैं अग्नि AI हूँ।", "language": "hi-IN" }
```

### `POST /api/stt`
FormData with `file` (audio/webm or audio/wav)

### `GET /api/sessions` — List all chats
### `POST /api/sessions` — Create new chat
### `GET /api/sessions/:id` — Get chat with messages
### `DELETE /api/sessions/:id` — Delete chat

---

## 🎨 Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--aagni-bg` | `#090910` | Main background |
| `--aagni-surface` | `#0f0f1a` | Card backgrounds |
| `--aagni-saffron` | `#FF6B00` | Primary accent |
| `--aagni-gold` | `#D4A017` | Secondary accent |
| `--aagni-ember` | `#FF3D00` | Hover/active states |
| `--aagni-green` | `#00C896` | Success states |
| Font | Times New Roman | Entire interface |

---

## 🇮🇳 Built with Pride in India

Made by **Mr. Bhavya Kansal** — Founder & CEO, Multimodex AI  
Powered by **Sarvam AI** — India's own AI infrastructure
