'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Logo() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-6 left-6 z-[100]"
    >
      <Link href="/" className="block group">
        <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
          <Image
            src="/favicon.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
      </Link>
    </motion.div>
  )
}
