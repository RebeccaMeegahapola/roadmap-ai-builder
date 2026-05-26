'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
    GitBranch,
    Calendar,
    ArrowRight,
    Trash2,
    Edit,
    Sparkles,
    FolderOpen
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Roadmap {
    id: string
    title: string
    description: string
    created_at: string
}

export default function RoadmapsPage() {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchRoadmaps()
    }, [])

    async function fetchRoadmaps() {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            const { data } = await supabase
                .from('roadmaps')
                .select('*')
                .eq('owner_id', user.id)
                .order('created_at', { ascending: false })
            setRoadmaps(data || [])
        }
        setLoading(false)
    }

    async function deleteRoadmap(id: string) {
        if (confirm('Are you sure you want to delete this roadmap?')) {
            await supabase.from('roadmaps').delete().eq('id', id)
            fetchRoadmaps()
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black-deep flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-text-secondary">Loading your roadmaps...</p>
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

            <div className="relative max-w-7xl mx-auto px-4 py-12">
                {/* Header - Improved */}
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h1 className="text-2xl md:text-3xl font-bold text-text-primary">My Roadmaps</h1>
                            </div>
                            <p className="text-text-secondary text-sm">
                                {roadmaps.length} {roadmaps.length === 1 ? 'roadmap' : 'roadmaps'} created
                            </p>
                        </div>

                        <Link href="/">
                            <Button variant="primary" size="sm" className="shadow-lg">
                                New Roadmap
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Roadmaps List */}
                {roadmaps.length === 0 ? (
                    <Card className="text-center p-12">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-purple-primary/10 rounded-full flex items-center justify-center mb-4">
                                <GitBranch className="w-10 h-10 text-purple-light" />
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary mb-2">No roadmaps yet</h3>
                            <p className="text-text-secondary mb-6">Create your first roadmap using AI</p>
                            <Link href="/">
                                <Button variant="primary" size="sm">
                                    Create Roadmap
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {roadmaps.map((roadmap, index) => (
                            <motion.div
                                key={roadmap.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="hover:border-purple-primary/30 transition-all duration-300">
                                    <div className="p-6 flex items-center justify-between">
                                        <div className="flex-1">
                                            <Link href={`/roadmap/${roadmap.id}`}>
                                                <h3 className="text-lg font-semibold text-text-primary hover:text-purple-light transition mb-2">
                                                    {roadmap.title}
                                                </h3>
                                            </Link>
                                            <p className="text-text-secondary text-sm mb-2 line-clamp-2">
                                                {roadmap.description || 'No description'}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-text-muted">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(roadmap.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4">
                                            <Link href={`/roadmap/${roadmap.id}/edit`}>
                                                <button className="p-2 rounded-lg hover:bg-purple-primary/10 transition text-text-muted hover:text-purple-light">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => deleteRoadmap(roadmap.id)}
                                                className="p-2 rounded-lg hover:bg-red-500/10 transition text-text-muted hover:text-red-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}