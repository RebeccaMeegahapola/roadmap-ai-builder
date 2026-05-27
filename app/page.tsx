'use client'

import { useState } from 'react'
import {
  Sparkles,
  ArrowRight,
  Brain,
  LayoutList,
  Share2,
  Gauge,
  Star,
  Play,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Describe your goal → Get a structured roadmap instantly",
  },
  {
    icon: LayoutList,
    title: "Visual Timeline",
    description: "Interactive Gantt view with drag-and-drop milestones",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Export to PDF or share a live link with your team",
  },
];

const sampleMilestones = [
  { phase: "Foundation & Architecture", week: "Wk 1–3", desc: "Set up monorepo, CI/CD, auth system, and database" },
  { phase: "Core Product Features", week: "Wk 4–9", desc: "Task boards, real-time updates, file attachments" },
  { phase: "Collaboration & Notifications", week: "Wk 10–13", desc: "Comments, mentions, activity feed, Slack" },
  { phase: "Launch & Mobile App", week: "Wk 14–20", desc: "React Native app, beta testing, public launch" },
];

export default function Home() {
  const [showGenerator, setShowGenerator] = useState(false)

  return (
      <div className="min-h-screen bg-black-deep text-text-primary">
        {/* Hero Section */}
        <section className="relative px-6 pt-24 pb-20 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-purple-primary/10 border border-purple-primary/20 text-xs font-medium text-purple-light">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Roadmap Generator
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold leading-tight tracking-tight mb-5">
              Turn ideas into{" "}
              <span className="text-gradient-purple">actionable roadmaps</span>
              <br />
              in seconds
            </h1>

            <p className="text-base text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
              Describe your project — AI breaks it into phases, milestones,
              and realistic timelines you can actually use.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
              <a
                  href={"/generator"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-purple text-white rounded-lg text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
              >
                Try Now - Free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                  href="#demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black-surface border border-purple-primary/20 text-text-primary rounded-lg text-sm font-medium hover:border-purple-primary/40 transition-all"
              >
                <Play className="w-4 h-4" />
                See demo
              </a>
            </div>

            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-light">12k+</div>
                <div className="text-xs text-text-muted">Roadmaps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-light">4.9★</div>
                <div className="text-xs text-text-muted">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-light">&lt;5s</div>
                <div className="text-xs text-text-muted">Generation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="px-6 py-20 bg-black-surface/20 border-t border-b border-purple-primary/10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold mb-2">See it in action</h2>
              <p className="text-sm text-text-secondary">
                A sample AI-generated roadmap for a SaaS product launch
              </p>
            </div>

            <div className="rounded-xl bg-black-surface border border-purple-primary/15 overflow-hidden">
              <div className="px-5 py-4 border-b border-purple-primary/10 bg-purple-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-light" />
                  <span className="text-xs font-medium text-text-secondary">Your prompt</span>
                </div>
                <p className="text-sm text-text-secondary italic">
                  "Build a SaaS project management tool with team collaboration and a mobile app. Launch in 5 months."
                </p>
              </div>

              <div className="px-5 py-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-text-secondary">Generated roadmap</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-purple-primary/10 text-purple-light">4 phases</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-purple-primary/10 text-purple-light">20 weeks</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {sampleMilestones.map((m, i) => (
                      <div key={i} className="flex gap-3 py-2 border-b border-purple-primary/8 last:border-0">
                        <div className="pt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="text-sm font-medium text-text-primary">{m.phase}</span>
                            <span className="text-xs text-purple-light">{m.week}</span>
                          </div>
                          <p className="text-xs text-text-secondary">{m.desc}</p>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-3">Everything you need to plan faster</h2>
              <p className="text-sm text-text-secondary">Simple, powerful, and built for modern teams</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {features.map((feature, idx) => (
                  <div
                      key={feature.title}
                      className="group relative p-6 rounded-xl bg-black-surface/50 border border-purple-primary/10 hover:border-purple-primary/30 hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-purple-light" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
                    {idx === 0 && <Star className="absolute top-4 right-4 w-4 h-4 text-gold-primary" />}
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-6 border-t border-purple-primary/10">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-purple-primary" />
              <span>AI Roadmap Generator — 2025</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-text-secondary transition">Privacy</a>
              <a href="#" className="hover:text-text-secondary transition">Terms</a>
            </div>
          </div>
        </footer>
      </div>
  )
}