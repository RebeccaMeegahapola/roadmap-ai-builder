'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Menu, X, LayoutDashboard, GitBranch, Sparkles, Moon, Sun, Plus
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
    }, [])

    const toggleDarkMode = () => {
        const newIsDark = !isDark
        setIsDark(newIsDark)
        if (newIsDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/roadmaps', label: 'My Roadmaps', icon: GitBranch },
        { href: '/generator', label: 'New Roadmaps', icon: Plus },
    ]

    const isActive = (path: string) => pathname === path

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-xl border-b border-purple-primary/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-gradient-purple rounded-lg flex items-center justify-center shadow-lg glow-purple-sm">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-text-primary text-lg">
                                AI Roadmap
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                                        ${isActive(item.href)
                                        ? 'bg-purple-primary/20 text-purple-light border border-purple-primary/30 glow-purple-sm'
                                        : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-4">
                            {/* Dark mode toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 transition text-text-secondary"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>

                            {/* Hamburger Menu Button - Mobile only */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden p-2 transition text-text-secondary"
                            >
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden border-t border-purple-primary/20 bg-black/95 backdrop-blur-xl"
                        >
                            <div className="px-4 py-2 space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                                            ${isActive(item.href)
                                            ? 'bg-purple-primary/20 text-purple-light'
                                            : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                                        }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <div className="h-16" />
        </>
    )
}