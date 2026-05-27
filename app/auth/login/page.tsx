'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Sparkles, ArrowRight, UserPlus } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        if (isSignUp) {
            // Sign Up
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            })

            if (error) {
                setError(error.message)
            } else {
                // Auto sign in after sign up
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password
                })
                if (!signInError) {
                    router.push('/dashboard')
                    router.refresh()
                }
            }
        } else {
            // Sign In
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                setError(error.message)
            } else {
                router.push('/dashboard')
                router.refresh()
            }
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black-deep">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-primary/20 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-primary/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative w-full max-w-md px-4">
                <div className="bg-black-surface/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-primary/20 p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-text-primary mb-1">
                            {isSignUp ? 'Create Account' : 'Welcome Back'}
                        </h1>
                        <p className="text-text-secondary text-sm">
                            {isSignUp ? 'Sign up to start creating roadmaps' : 'Sign in to continue to your roadmaps'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2.5 bg-black-elevated/50 border border-purple-primary/20 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-purple-primary focus:border-transparent transition outline-none"
                                required
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 bg-black-elevated/50 border border-purple-primary/20 rounded-xl text-text-primary placeholder-text-muted focus:ring-2 focus:ring-purple-primary focus:border-transparent transition outline-none"
                                required
                            />
                        </div>

                        {!isSignUp && (
                            <div className="text-right">
                                <button
                                    type="button"
                                    className="text-xs text-purple-light hover:text-purple-primary transition"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-purple text-white py-2.5 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {isSignUp ? 'Creating account...' : 'Signing in...'}
                                </>
                            ) : (
                                <>
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setIsSignUp(!isSignUp)
                                setError('')
                            }}
                            className="text-sm text-purple-light hover:text-purple-primary transition"
                        >
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}