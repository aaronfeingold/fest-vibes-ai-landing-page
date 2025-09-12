'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLogoPosition } from '@/hooks/use-feature-flags'

interface ABTestNavigationProps {
  onBoomyClick: () => void
  onJoinBetaClick: () => void
}

export function ABTestNavigation({ onBoomyClick, onJoinBetaClick }: ABTestNavigationProps) {
  const logoPosition = useLogoPosition()

  // Logo component
  const LogoComponent = () => (
    <div className="flex items-center space-x-2">
      <button
        onClick={onBoomyClick}
        className="transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
      >
        <img
          src="/boomy-nav.png"
          alt="Boomy the Cat"
          className="w-14 h-14 rounded-lg object-cover"
        />
      </button>
      <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-green-500 bg-clip-text">
        Fest Vibes
      </span>
    </div>
  )

  // Navigation links component
  const NavLinks = () => (
    <div className="hidden md:flex items-center space-x-8">
      <a
        href="#features"
        className="text-gray-300 hover:text-white transition-colors"
      >
        Features
      </a>
      <a
        href="#demo"
        className="text-gray-300 hover:text-white transition-colors"
      >
        Demo
      </a>
      <a
        href="#analytics"
        className="text-gray-300 hover:text-white transition-colors"
      >
        Analytics
      </a>
      <Button
        onClick={onJoinBetaClick}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        Get Started
      </Button>
    </div>
  )

  // Render based on logo position A/B test
  if (logoPosition === 'right') {
    return (
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
        <NavLinks />
        <LogoComponent />
      </nav>
    )
  }

  if (logoPosition === 'center') {
    return (
      <nav className="relative z-10 flex flex-col items-center p-6 lg:px-8 space-y-4">
        <LogoComponent />
        <NavLinks />
      </nav>
    )
  }

  // Default: left position
  return (
    <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8">
      <LogoComponent />
      <NavLinks />
    </nav>
  )
}