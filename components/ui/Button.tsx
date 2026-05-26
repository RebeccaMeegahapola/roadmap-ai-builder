'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'outline' | 'gold'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
    disabled?: boolean
    icon?: React.ReactNode
    className?: string
}

export function Button({
                           children,
                           onClick,
                           variant = 'primary',
                           size = 'md',
                           loading = false,
                           disabled = false,
                           icon,
                           className = ''
                       }: ButtonProps) {
    const variants = {
        primary: 'bg-gradient-purple text-white font-semibold hover:shadow-lg hover:scale-105 transition-all glow-purple-sm',
        secondary: 'bg-black-elevated text-text-primary border border-purple-primary/30 hover:border-purple-primary hover:glow-purple-sm transition-all',
        outline: 'border-2 border-purple-primary text-purple-primary hover:bg-purple-primary/10 transition-all',
        gold: 'bg-gradient-gold text-black-deep font-semibold hover:shadow-gold transition-all'
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

    return (
        <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 0.99 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                ${variants[variant]}
                ${sizes[size]}
                rounded-xl font-semibold
                transition-all duration-200
                flex items-center justify-center gap-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${className}
            `}
        >
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                icon
            )}
            {children}
        </motion.button>
    )
}