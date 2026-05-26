'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Sparkles, ArrowRight, Shield, Zap } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (error) {
            alert(error.message)
            setLoading(false)
        } else {
            setSent(true)
            setLoading(false)
        }
    }

    if (sent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black-deep">
                <div className="relative w-full max-w-md px-4">
                    <div className="bg-black-surface/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-primary/20 p-8 text-center">
                        <div className="w-20 h-20 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Mail className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-text-primary mb-2">Check your email</h1>
                        <p className="text-text-secondary mb-4">
                            We sent a magic link to <span className="text-purple-light font-medium">{email}</span>
                        </p>
                        <p className="text-text-muted text-sm mb-6">
                            Click the link in your email to sign in instantly.
                        </p>
                        <button
                            onClick={() => setSent(false)}
                            className="text-purple-light hover:text-purple-primary transition text-sm"
                        >
                            ← Back to login
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-black-deep">
            {/* Animated Gradient Orbs - Pure CSS, no SVG */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-primary/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-primary/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-primary/25 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-primary/10 rounded-full blur-3xl" />
            </div>

            {/* Simple Dot Pattern - CSS only */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.1) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    {/* Floating Elements */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-primary/10 rounded-full blur-2xl animate-float" />
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-primary/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />

                    {/* Main Card */}
                    <div className="relative bg-black-surface/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-primary/20 p-8 transition-all duration-500 hover:border-purple-primary/40">
                        {/* Logo & Badge */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-primary/10 border border-purple-primary/20 mb-3">
                                <Zap className="w-3 h-3 text-purple-light" />
                                <span className="text-xs text-purple-light font-medium">AI-Powered</span>
                            </div>
                            <h1 className="text-2xl font-bold text-text-primary mb-1">Welcome back</h1>
                            <p className="text-text-secondary text-sm">Sign in to continue to your roadmaps</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleEmailLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-text-secondary mb-1.5">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-black-elevated/50 border border-purple-primary/20 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-purple-primary focus:border-transparent transition-all outline-none"
                                    required
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-purple text-white py-2.5 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Continue with Email
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Features */}
                        <div className="mt-8 pt-6 border-t border-purple-primary/10">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 flex items-center justify-center">
                                        <Shield className="w-3.5 h-3.5 text-purple-light" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-text-primary">Secure</p>
                                        <p className="text-[10px] text-text-muted">Magic link auth</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-purple-primary/10 flex items-center justify-center">
                                        <Zap className="w-3.5 h-3.5 text-purple-light" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-text-primary">Fast</p>
                                        <p className="text-[10px] text-text-muted">Instant access</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <p className="text-center text-xs text-text-muted mt-6">
                        By continuing, you agree to our Terms of Service
                    </p>
                </div>
            </div>
        </div>
    )
}