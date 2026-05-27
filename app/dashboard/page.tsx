'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
    Plus,
    TrendingUp,
    Clock,
    Calendar,
    ArrowRight,
    Sparkles,
    FolderOpen
} from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Navbar } from "@/components/navigation/Navbar";
import { supabase } from '@/lib/supabase/client'

interface Roadmap {
    id: string
    title: string
    description: string
    created_at: string
}

export default function DashboardPage() {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function fetchRoadmaps() {
            try {
                console.log('Fetching roadmaps...')

                const { data, error } = await supabase
                    .from('roadmaps')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(20)

                if (error) {
                    console.error('Supabase error:', error)
                    setError(error.message)
                } else {
                    setRoadmaps(data || [])
                }
            } catch (err: any) {
                console.error('Fetch exception:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchRoadmaps()
    }, [])

    const stats = [
        { label: 'Total Roadmaps', value: roadmaps.length, icon: FolderOpen },
        { label: 'Completion Rate', value: '0%', icon: TrendingUp },
        { label: 'Active Projects', value: roadmaps.length, icon: Clock },
    ]

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-black-deep flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-text-secondary">Loading your dashboard...</p>
                    </div>
                </div>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-black-deep flex items-center justify-center">
                    <Card className="text-center p-8 max-w-md">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-8 h-8 text-red-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary mb-2">Connection Issue</h3>
                        <p className="text-text-secondary mb-4">Unable to load roadmaps. Please refresh.</p>
                        <Button onClick={() => window.location.reload()} variant="primary" size="sm">
                            Refresh Page
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Card>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black-deep">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-primary/8 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-12">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-text-primary mb-1">Dashboard</h1>
                            <p className="text-text-secondary">Welcome! Here's an overview of your roadmaps.</p>
                        </div>
                        <Button
                            onClick={() => router.push('/generator')}
                            variant="primary"
                            size="sm"
                            icon={<Plus className="w-4 h-4" />}
                            className="shrink-0"
                        >
                            New Roadmap
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {stats.map((stat, idx) => (
                            <Card key={idx} className="hover:border-purple-primary/30 transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-purple-primary/10 flex items-center justify-center">
                                            <stat.icon className="w-5 h-5 text-purple-light" />
                                        </div>
                                        <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                                    </div>
                                    <p className="text-text-secondary text-sm">{stat.label}</p>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold text-text-primary">Your Roadmaps</h2>
                            <span className="text-sm text-text-muted">({roadmaps.length})</span>
                        </div>
                    </div>

                    {roadmaps.length === 0 ? (
                        <Card className="text-center p-12">
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-purple-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <Sparkles className="w-10 h-10 text-purple-light" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">No roadmaps yet</h3>
                                <p className="text-text-secondary mb-6">Create your first AI-powered roadmap!</p>
                                <Button onClick={() => router.push('/generator')} variant="primary" size="sm">
                                    Create Roadmap
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {roadmaps.map((roadmap, idx) => (
                                <motion.div
                                    key={roadmap.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link href={`/roadmap/${roadmap.id}`}>
                                        <Card hover className="h-full cursor-pointer transition-all duration-300 hover:border-purple-primary/30">
                                            <div className="p-6">
                                                <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-1">
                                                    {roadmap.title}
                                                </h3>
                                                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                                                    {roadmap.description || 'No description'}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-text-muted">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(roadmap.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}