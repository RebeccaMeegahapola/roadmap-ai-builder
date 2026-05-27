'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Save, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Navbar } from "@/components/navigation/Navbar"

export default function EditRoadmapPage() {
    const params = useParams()
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        async function fetchRoadmap() {
            const { data, error } = await supabase
                .from('roadmaps')
                .select('*')
                .eq('id', params.id)
                .single()

            if (!error && data) {
                setTitle(data.title)
                setDescription(data.description || '')
            }
            setLoading(false)
        }

        fetchRoadmap()
    }, [params.id])

    const handleSave = async () => {
        setSaving(true)
        const { error } = await supabase
            .from('roadmaps')
            .update({ title, description, updated_at: new Date().toISOString() })
            .eq('id', params.id)

        if (!error) {
            router.push(`/roadmap/${params.id}`)
        }
        setSaving(false)
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-black-deep flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-text-secondary">Loading...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black-deep">
                {/* Subtle Background Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-primary/8 rounded-full blur-3xl" />
                </div>

                <div className="relative max-w-3xl mx-auto px-4 py-12">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href={`/roadmap/${params.id}`}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black-surface/50 border border-purple-primary/20 text-text-secondary hover:text-text-primary hover:border-purple-primary/40 hover:bg-purple-primary/5 transition-all duration-200 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium">Back to Roadmap</span>
                        </Link>
                    </div>

                    {/* Edit Form Card */}
                    <Card className="overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-purple rounded-xl flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold text-text-primary">Edit Roadmap</h1>
                            </div>

                            <div className="space-y-6">
                                {/* Title Field */}
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-2 bg-black-elevated/50 border border-purple-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20 transition-all outline-none"
                                        placeholder="Roadmap title"
                                    />
                                </div>

                                {/* Description Field */}
                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={5}
                                        className="w-full px-4 py-2 bg-black-elevated/50 border border-purple-primary/20 rounded-lg text-text-primary placeholder-text-muted focus:border-purple-primary focus:ring-2 focus:ring-purple-primary/20 transition-all outline-none resize-none"
                                        placeholder="Describe your roadmap..."
                                    />
                                </div>

                                {/* Save Button */}
                                <Button
                                    onClick={handleSave}
                                    disabled={saving}
                                    variant="primary"
                                    size="lg"
                                    loading={saving}
                                    icon={<Save className="w-4 h-4" />}
                                    className="w-full"
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}