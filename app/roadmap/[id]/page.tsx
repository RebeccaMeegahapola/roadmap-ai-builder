'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
    ArrowLeft,
    Calendar,
    Clock,
    Flag,
    CheckCircle,
    Circle,
    TrendingUp,
    CalendarDays,
    Sparkles,
    Loader2,
    AlertCircle,
    Target,
    BarChart3
} from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'

interface Milestone {
    id: string
    title: string
    description: string
    start_date: string
    end_date: string
    priority: string
    status: string
    progress: number
    tags?: string[]
}

interface Roadmap {
    id: string
    title: string
    description: string
    created_at: string
    timeline_config: any
    owner_id: string
}

export default function RoadmapPage() {
    const params = useParams()
    const router = useRouter()
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
    const [milestones, setMilestones] = useState<Milestone[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [updating, setUpdating] = useState<string | null>(null)

    const supabase = createClient()

    useEffect(() => {
        fetchRoadmap()
    }, [params.id])

    async function fetchRoadmap() {
        try {
            const id = params.id as string

            const { data: roadmapData, error: roadmapError } = await supabase
                .from('roadmaps')
                .select('*')
                .eq('id', id)
                .single()

            if (roadmapError) throw roadmapError

            const { data: itemsData, error: itemsError } = await supabase
                .from('roadmap_items')
                .select('*')
                .eq('roadmap_id', id)
                .order('start_date', { ascending: true })

            if (itemsError) throw itemsError

            setRoadmap(roadmapData)
            setMilestones(itemsData || [])
        } catch (err: any) {
            console.error('Error fetching roadmap:', err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const toggleMilestoneStatus = async (milestone: Milestone) => {
        setUpdating(milestone.id)

        const newStatus = milestone.status === 'completed' ? 'planned' : 'completed'
        const newProgress = newStatus === 'completed' ? 100 : 0

        const { error } = await supabase
            .from('roadmap_items')
            .update({
                status: newStatus,
                progress: newProgress
            })
            .eq('id', milestone.id)

        if (!error) {
            setMilestones(prev => prev.map(m =>
                m.id === milestone.id
                    ? { ...m, status: newStatus, progress: newProgress }
                    : m
            ))
        }

        setUpdating(null)
    }

    const completedMilestones = milestones.filter(m => m.status === 'completed').length
    const totalMilestones = milestones.length
    const progress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30'
            case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
            case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
            default: return 'bg-green-500/20 text-green-400 border-green-500/30'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black-deep flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
                    <p className="text-text-secondary">Loading your roadmap...</p>
                </div>
            </div>
        )
    }

    if (error || !roadmap) {
        return (
            <div className="min-h-screen bg-black-deep flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-10 h-10 text-red-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary mb-2">Something went wrong</h1>
                    <p className="text-text-secondary mb-6">{error || 'Roadmap not found'}</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-purple text-white rounded-xl font-semibold hover:shadow-lg transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black-deep">
            {/* Subtle Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-primary/8 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black-surface/50 border border-purple-primary/20 text-text-secondary hover:text-text-primary hover:border-purple-primary/40 hover:bg-purple-primary/5 transition-all duration-200 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium">Back to Dashboard</span>
                        </Link>
                    </div>

                    <Card className="p-8">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-gradient-purple rounded-xl flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-white" />
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary">{roadmap.title}</h1>
                                </div>
                                <p className="text-text-secondary text-lg mb-4">{roadmap.description}</p>

                                <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        Created: {new Date(roadmap.created_at).toLocaleDateString()}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Flag className="w-4 h-4" />
                                        {totalMilestones} Milestones
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <BarChart3 className="w-4 h-4" />
                                        {Math.round(progress)}% Complete
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar Section */}
                        {totalMilestones > 0 && (
                            <div className="mt-6 pt-6 border-t border-purple-primary/10">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-text-secondary">Overall Progress</span>
                                    <span className="text-purple-light font-semibold">{Math.round(progress)}%</span>
                                </div>
                                <div className="relative w-full bg-purple-primary/10 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="absolute h-full bg-gradient-purple rounded-full"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-text-muted">Completed: {completedMilestones}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        <span className="text-sm text-text-muted">In Progress: {milestones.filter(m => m.status === 'active').length}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                        <span className="text-sm text-text-muted">Planned: {milestones.filter(m => m.status === 'planned').length}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                </motion.div>

                {/* Timeline Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="overflow-hidden">
                        <div className="p-6 border-b border-purple-primary/10">
                            <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
                                <CalendarDays className="w-5 h-5 text-purple-light" />
                                Timeline & Milestones
                            </h2>
                        </div>

                        <AnimatePresence>
                            {milestones.length === 0 ? (
                                <div className="p-12 text-center">
                                    <div className="w-20 h-20 bg-purple-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Target className="w-10 h-10 text-text-muted" />
                                    </div>
                                    <p className="text-text-secondary">No milestones yet.</p>
                                    <p className="text-sm text-text-muted mt-2">Generate a roadmap to see milestones here.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-purple-primary/5">
                                    {milestones.map((milestone, index) => (
                                        <motion.div
                                            key={milestone.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ backgroundColor: 'rgba(124,58,237,0.03)' }}
                                            className="p-6 transition-colors"
                                        >
                                            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                                                {/* Timeline number / Status indicator */}
                                                <div className="flex-shrink-0">
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                                                        milestone.status === 'completed'
                                                            ? 'bg-green-500'
                                                            : 'bg-gradient-purple'
                                                    }`}>
                                                        {milestone.status === 'completed' ? (
                                                            <CheckCircle className="w-6 h-6" />
                                                        ) : (
                                                            index + 1
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Content with interactive checkbox */}
                                                <div className="flex-1">
                                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                                        {/* Clickable Checkbox */}
                                                        <button
                                                            onClick={() => toggleMilestoneStatus(milestone)}
                                                            disabled={updating === milestone.id}
                                                            className="flex-shrink-0 focus:outline-none group"
                                                        >
                                                            {updating === milestone.id ? (
                                                                <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                                                            ) : milestone.status === 'completed' ? (
                                                                <CheckCircle className="w-5 h-5 text-green-400 hover:text-green-300 transition-colors" />
                                                            ) : (
                                                                <Circle className="w-5 h-5 text-text-muted hover:text-purple-400 transition-colors" />
                                                            )}
                                                        </button>

                                                        <h3 className={`text-lg font-semibold ${milestone.status === 'completed' ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                                                            {milestone.title}
                                                        </h3>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(milestone.priority)}`}>
                                                            {milestone.priority.toUpperCase()}
                                                        </span>
                                                    </div>

                                                    <p className={`text-text-secondary mb-3 ${milestone.status === 'completed' ? 'line-through text-text-muted' : ''}`}>
                                                        {milestone.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            Start: {new Date(milestone.start_date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            End: {new Date(milestone.end_date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            Duration: {Math.ceil((new Date(milestone.end_date).getTime() - new Date(milestone.start_date).getTime()) / (1000 * 60 * 60 * 24))} days
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Progress circle (only for non-completed) */}
                                                {milestone.status !== 'completed' && milestone.progress > 0 && milestone.progress < 100 && (
                                                    <div className="flex-shrink-0">
                                                        <div className="relative w-16 h-16">
                                                            <svg className="w-16 h-16 transform -rotate-90">
                                                                <defs>
                                                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                        <stop offset="0%" stopColor="#7C3AED" />
                                                                        <stop offset="100%" stopColor="#A78BFA" />
                                                                    </linearGradient>
                                                                </defs>
                                                                <circle
                                                                    cx="32"
                                                                    cy="32"
                                                                    r="28"
                                                                    stroke="rgba(124,58,237,0.1)"
                                                                    strokeWidth="4"
                                                                    fill="none"
                                                                />
                                                                <circle
                                                                    cx="32"
                                                                    cy="32"
                                                                    r="28"
                                                                    stroke="url(#gradient)"
                                                                    strokeWidth="4"
                                                                    fill="none"
                                                                    strokeDasharray={`${2 * Math.PI * 28}`}
                                                                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - milestone.progress / 100)}`}
                                                                    className="transition-all duration-500"
                                                                />
                                                            </svg>
                                                            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-text-primary">
                                                                {milestone.progress}%
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </Card>
                </motion.div>

                {/* Quick Stats Footer */}
                {milestones.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
                    >
                        <div className="p-4 rounded-xl bg-black-surface/30 border border-purple-primary/10">
                            <div className="flex items-center gap-2 text-purple-light mb-1">
                                <Target className="w-4 h-4" />
                                <span className="text-sm">Total Milestones</span>
                            </div>
                            <div className="text-2xl font-bold text-text-primary">{totalMilestones}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-black-surface/30 border border-purple-primary/10">
                            <div className="flex items-center gap-2 text-green-400 mb-1">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm">Completed</span>
                            </div>
                            <div className="text-2xl font-bold text-text-primary">{completedMilestones}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-black-surface/30 border border-purple-primary/10">
                            <div className="flex items-center gap-2 text-purple-light mb-1">
                                <TrendingUp className="w-4 h-4" />
                                <span className="text-sm">Completion Rate</span>
                            </div>
                            <div className="text-2xl font-bold text-text-primary">{Math.round(progress)}%</div>
                        </div>
                        <div className="p-4 rounded-xl bg-black-surface/30 border border-purple-primary/10">
                            <div className="flex items-center gap-2 text-purple-light mb-1">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">Est. Total Days</span>
                            </div>
                            <div className="text-2xl font-bold text-text-primary">
                                {milestones.reduce((total, m) => {
                                    const days = Math.ceil((new Date(m.end_date).getTime() - new Date(m.start_date).getTime()) / (1000 * 60 * 60 * 24))
                                    return total + days
                                }, 0)}
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}