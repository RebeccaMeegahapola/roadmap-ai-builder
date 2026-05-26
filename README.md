# 🚀 AI Roadmap Generator

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-purple)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

> Transform your ideas into actionable roadmaps in seconds with the power of AI

![AI Roadmap Generator Demo](./public/demo.png)

## ✨ Features

- 🤖 **AI-Powered Generation** - Describe your project, get a structured roadmap instantly
- 📊 **Visual Timeline** - Interactive Gantt-style view with drag-and-drop milestones
- ✅ **Milestone Tracking** - Mark tasks complete and track progress in real-time
- 🎨 **Premium Design** - Elegant black & purple theme with smooth animations
- 🔗 **Easy Sharing** - Share roadmaps with your team via unique links
- 💾 **Auto-Save** - Never lose your work with automatic saving
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth (Magic Links) |
| **AI Provider** | Groq API (Llama 3.1) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

## 📋 Prerequisites

- Node.js 18+
- npm / yarn / pnpm
- Supabase account (free tier)
- Groq API key (free)

## 🚀 Getting Started

### 1. Clone the Repository

#### git clone https://github.com/RebeccaMeegahapola/roadmap-ai-builder.git

### 2. Install Dependencies
npm install
#### or
yarn install

### 3. Set Up Environment Variables

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key

### 4. Run the Development Server
npm run dev
#### or
yarn dev

```bash
### Project Structure
roadmap-ai-builder/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── callback/
│   │       └── route.ts          # Auth callback handler
│   ├── api/
│   │   └── generate-roadmap/
│   │       └── route.ts          # AI generation API
│   ├── dashboard/
│   │   └── page.tsx              # User dashboard
│   ├── roadmap/
│   │   ├── [id]/
│   │   │   ├── page.tsx          # Roadmap view
│   │   │   └── edit/
│   │   │       └── page.tsx      # Edit roadmap
│   │   └── page.tsx              # All roadmaps list
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page / Generator
│   └── globals.css               # Global styles
├── components/
│   ├── ai/
│   │   └── RoadmapGenerator.tsx  # Main generator component
│   ├── navigation/
│   │   ├── Navbar.tsx            # Navigation bar
│   │   └── QuickNav.tsx          # Floating action buttons
│   └── ui/
│       ├── Button.tsx            # Reusable button
│       └── Card.tsx              # Reusable card
├── lib/
│   ├── ai/
│   │   └── groq.ts               # Groq AI integration
│   └── supabase/
│       ├── client.ts             # Supabase browser client
│       └── server.ts             # Supabase server client
├── hooks/
├── stores/
├── types/
├── public/
├── .env.local
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
├── package.json
└── README.md

```

### 🎯 Usage Guide
#### Creating a Roadmap
Describe your project - Enter your project idea, timeline, and requirements

Click Generate - AI analyzes and creates a structured roadmap

Review & Edit - Adjust phases, milestones, or dates as needed

Track Progress - Mark milestones complete as you progress

---
### 📊 API Endpoints
#### /api/generate-roadmap	POST	Generate AI roadmap from prompt
#### /auth/callback	GET	Supabase auth callback