'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Sparkles,
    Zap,
    Lightbulb,
    Stars,
    Rocket,
    Wand2,
    Target,
    Brain,
    Gauge,
    LineChart,
    Smartphone,
    ShoppingCart,
    Bot,
    GraduationCap,
    Clock,
    BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const QUICK_PROMPTS = [
    {
        icon: Smartphone,
        title: "Mobile App Launch",
        prompt: "Build a mobile app for fitness tracking with social features. Launch MVP in 2 months.",
        color: "from-purple-600 to-purple-400"
    },
    {
        icon: ShoppingCart,
        title: "E-commerce Platform",
        prompt: "Create an e-commerce website for handmade crafts with payment integration.",
        color: "from-purple-500 to-purple-300"
    },
    {
        icon: Bot,
        title: "AI SaaS Product",
        prompt: "Launch a SaaS product for project management with AI-powered task suggestions.",
        color: "from-purple-600 to-purple-400"
    },
    {
        icon: GraduationCap,
        title: "Learning Platform",
        prompt: "Develop a learning platform for coding bootcamp with interactive exercises.",
        color: "from-purple-500 to-purple-300"
    }
]

export function RoadmapGenerator() {
    const [prompt, setPrompt] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [progress, setProgress] = useState(0)
    const [currentStep, setCurrentStep] = useState<'idle' | 'analyzing' | 'creating' | 'finalizing'>('idle')
    const router = useRouter()
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const autoResize = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }

    useEffect(() => {
        autoResize()
    }, [prompt])

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) return

        setIsGenerating(true)
        setCurrentStep('analyzing')

        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 10, 90))
        }, 500)

        try {
            const response = await fetch('/api/generate-roadmap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            })

            const data = await response.json()

            if (data.success) {
                setCurrentStep('finalizing')
                setProgress(100)

                setTimeout(() => {
                    router.push(`/roadmap/${data.roadmapId}`)
                }, 1000)
            } else {
                throw new Error(data.error)
            }

        } catch (error) {
            console.error('Generation failed:', error)
            alert('Failed to generate roadmap. Please try again.')
        } finally {
            clearInterval(progressInterval)
            setIsGenerating(false)
            setCurrentStep('idle')
            setProgress(0)
        }
    }, [prompt, router])

    return (
        <div className="min-h-screen bg-black overflow-hidden">
            {/* Animated Background - Pure Purple */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-primary/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-5xl mx-auto px-4 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl font-bold text-gradient-purple mb-4">
                        AI Roadmap Generator
                    </h1>
                    <p className="text-text-secondary mt-4 text-md max-w-2xl mx-auto">
                        Transform your ideas into actionable roadmaps in seconds with the power of AI
                    </p>
                </motion.div>

                {/* Main Card */}
                <Card className="overflow-hidden">
                    {/* Input Area */}
                    <div className="p-8">
                        <label className="block text-sm font-bold mb-3 text-text-primary">
                            Describe your vision
                        </label>

                        <textarea
                            ref={textareaRef}
                            value={prompt}
                            onChange={(e) => {
                                setPrompt(e.target.value)
                                autoResize()
                            }}
                            placeholder="Example: 'I want to build a mobile app for learning Spanish with gamification, daily challenges, and social features. Need to launch MVP in 3 months with basic lessons, then add premium content later.'"
                            className="w-full min-h-[150px] p-4 border border-purple-primary/20 rounded-xl bg-black-elevated/50 text-text-primary placeholder-text-muted resize-none focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20 transition-all placeholder:text-sm text-sm"
                            disabled={isGenerating}
                            rows={4}
                        />

                        <div className="flex justify-between items-center mt-3 text-xs text-text-muted">
                            <motion.span
                                animate={{ scale: prompt.split(' ').filter(w => w.length > 0).length > 0 ? [1, 1.1, 1] : 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-1"
                            >
                                <Clock className="w-3 h-3" />
                                {prompt.split(' ').filter(w => w.length > 0).length} words
                            </motion.span>
                            <span className="flex items-center gap-1">
                                <Lightbulb className="w-3 h-3" />
                                Be specific for better results
                            </span>
                        </div>
                    </div>

                    {/* Quick Prompts */}
                    <div className="border-t border-white/5 px-8 py-6">
                        <p className="text-sm font-medium mb-3 flex items-center gap-2 text-text-secondary">
                            <Zap className="w-4 h-4 text-gold-primary" />
                            Quick start templates:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            {QUICK_PROMPTS.map((example, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setPrompt(example.prompt)
                                        setTimeout(autoResize, 0)
                                    }}
                                    disabled={isGenerating}
                                    className="text-left p-4 rounded-xl bg-black-elevated/50 border border-white/5 hover:border-purple-primary/30 transition-all text-sm group"
                                >
                                    <example.icon className="w-5 h-5 text-purple-light mb-2" />
                                    <div className="font-medium text-text-primary text-sm">{example.title}</div>
                                    <div className="text-xs text-text-muted mt-1 line-clamp-2">
                                        {example.prompt.slice(0, 55)}...
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <div className="border-t border-purple-primary/10 p-8 bg-gradient-to-r from-purple-primary/5 to-transparent">
                        <Button
                            onClick={handleGenerate}
                            disabled={!prompt.trim() || isGenerating}
                            variant="primary"
                            size="lg"
                            loading={isGenerating}
                            className="w-full text-lg group"
                        >
                            {isGenerating ? (
                                <>
                                    {currentStep === 'analyzing' && (
                                        <>
                                            <Brain className="w-5 h-5 animate-pulse" />
                                            Analyzing your requirements...
                                        </>
                                    )}
                                    {currentStep === 'creating' && (
                                        <>
                                            <Sparkles className="w-5 h-5 animate-pulse" />
                                            Creating roadmap structure...
                                        </>
                                    )}
                                    {currentStep === 'finalizing' && (
                                        <>
                                            <Target className="w-5 h-5 animate-pulse" />
                                            Finalizing your roadmap...
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    Generate Roadmap
                                    <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </div>
                </Card>

                {/* Progress Indicator */}
                <AnimatePresence>
                    {isGenerating && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-8"
                        >
                            <Card>
                                <div className="p-6">
                                    <div className="flex justify-between mb-2 text-sm">
                                        <span className="font-medium text-text-primary">Generating your roadmap</span>
                                        <span className="text-purple-light">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-purple-primary/10 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-purple"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-text-muted">
                                        <Stars className="w-3 h-3 animate-pulse" />
                                        <span>Using advanced AI models...</span>
                                        <Stars className="w-3 h-3 animate-pulse" />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* Tips Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 p-6 rounded-xl bg-purple-primary/5 border border-purple-primary/20"
                >
                    <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-gold-primary flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-text-primary mb-1">Pro Tip</h4>
                            <p className="text-sm text-text-secondary">
                                For best results, include specific details like timeline, target audience, and key features.
                                The more context you provide, the better your roadmap will be!
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}