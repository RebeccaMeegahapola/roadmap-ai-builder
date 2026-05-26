'use client'

import { motion } from 'framer-motion'

interface CardProps {
    children: React.ReactNode
    className?: string
    hover?: boolean
    variant?: 'default' | 'purple' | 'gold'
}

export function Card({ children, className = '', hover = true, variant = 'default' }: CardProps) {
    const variants = {
        default: 'bg-black-surface/50 border-black-border',
        purple: 'bg-purple-primary/5 border-purple-primary/20 hover:border-purple-primary/40',
        gold: 'bg-gold-primary/5 border-gold-primary/20 hover:border-gold-primary/40'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
            className={`
                ${variants[variant]}
                rounded-2xl shadow-xl border
                backdrop-blur-sm
                transition-all duration-300
                ${className}
            `}
        >
            {children}
        </motion.div>
    )
}