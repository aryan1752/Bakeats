'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProductShowcase() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center overflow-hidden">
      {/* Main Product - Cookie Package */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1], // Bounce effect
          delay: 0.2
        }}
        className="relative z-10"
      >
        <Image
          src="/cookie-package.png" // Replace with your image path
          alt="Jeera Cookies Package"
          width={400}
          height={600}
          className="drop-shadow-2xl"
          priority
        />
      </motion.div>

      {/* Floating Ingredient 1 - Top Left */}
      <FloatingIngredient
        src="https://res.cloudinary.com/ddtifclgr/image/upload/v1770304407/jeera_uimjxy.png"
        alt="Jeera Seeds"
        delay={1.2}
        className="absolute top-20 left-20"
        size={120}
      />

      {/* Floating Ingredient 2 - Top Right */}
      <FloatingIngredient
        src="/cookie.png" // Replace with your image
        alt="Cookie"
        delay={1.4}
        className="absolute top-32 right-32"
        size={100}
      />

      {/* Floating Ingredient 3 - Bottom Left */}
      <FloatingIngredient
        src="/wheat.png" // Replace with your image
        alt="Wheat"
        delay={1.6}
        className="absolute bottom-40 left-40"
        size={110}
      />

      {/* Floating Ingredient 4 - Bottom Right */}
      <FloatingIngredient
        src="/spice.png" // Replace with your image
        alt="Spice"
        delay={1.8}
        className="absolute bottom-28 right-24"
        size={90}
      />

      {/* Floating Ingredient 5 - Middle Right */}
      <FloatingIngredient
        src="/ingredient5.png" // Replace with your image
        alt="Ingredient"
        delay={2.0}
        className="absolute top-1/2 right-16"
        size={105}
      />
    </div>
  )
}

// Reusable Floating Ingredient Component
function FloatingIngredient({ 
  src, 
  alt, 
  delay, 
  className, 
  size = 100 
}: {
  src: string
  alt: string
  delay: number
  className?: string
  size?: number
}) {
  // Random values for natural motion
  const randomDuration = 3 + Math.random() * 2
  const yOffset = -15 - Math.random() * 10
  const xOffset = (Math.random() - 0.5) * 10

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 50,
        scale: 0
      }}
      animate={{ 
        opacity: 1,
        y: [0, yOffset, 0],
        x: [0, xOffset, 0],
        scale: 1,
        rotate: [0, 5, -5, 0]
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { 
          duration: 0.6, 
          delay,
          ease: [0.34, 1.56, 0.64, 1]
        },
        y: {
          duration: randomDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        },
        x: {
          duration: randomDuration + 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        },
        rotate: {
          duration: randomDuration + 0.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay
        }
      }}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="drop-shadow-lg"
      />
    </motion.div>
  )
}