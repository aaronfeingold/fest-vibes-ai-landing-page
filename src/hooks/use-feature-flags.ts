'use client'

import { useEffect, useState } from 'react'
import { useFeatureFlagEnabled } from 'posthog-js/react'

interface FeatureFlags {
  logoPosition: 'left' | 'right' | 'center'
  copyVariant: 'original' | 'alternative' | 'concise'
  heroLayout: 'default' | 'compact' | 'expanded'
}

// Get bootstrap flags from cookie (set by middleware)
function getBootstrapFlags(): Partial<FeatureFlags> {
  if (typeof window === 'undefined') return {}
  
  try {
    const flagsCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('ph_bootstrap_flags='))
      ?.split('=')[1]
    
    if (!flagsCookie) return {}
    
    const flags = JSON.parse(decodeURIComponent(flagsCookie))
    return {
      logoPosition: flags['logo-position'] || 'left',
      copyVariant: flags['copy-variant'] || 'original', 
      heroLayout: flags['hero-layout'] || 'default'
    }
  } catch {
    return {}
  }
}

export function useFeatureFlags(): FeatureFlags {
  const [flags, setFlags] = useState<FeatureFlags>(() => ({
    logoPosition: 'left',
    copyVariant: 'original',
    heroLayout: 'default'
  }))

  // Get flags from PostHog (will override bootstrap once loaded)
  const logoPositionFlag = useFeatureFlagEnabled('logo-position')
  const copyVariantFlag = useFeatureFlagEnabled('copy-variant')
  const heroLayoutFlag = useFeatureFlagEnabled('hero-layout')

  useEffect(() => {
    // Start with bootstrap flags (from middleware)
    const bootstrapFlags = getBootstrapFlags()
    
    setFlags(prev => ({
      logoPosition: (bootstrapFlags.logoPosition as 'left' | 'right' | 'center') || prev.logoPosition,
      copyVariant: (bootstrapFlags.copyVariant as 'original' | 'alternative' | 'concise') || prev.copyVariant,
      heroLayout: (bootstrapFlags.heroLayout as 'default' | 'compact' | 'expanded') || prev.heroLayout
    }))
  }, [])

  // Update with PostHog flags when available
  useEffect(() => {
    if (logoPositionFlag !== undefined) {
      setFlags(prev => ({ ...prev, logoPosition: logoPositionFlag as 'left' | 'right' | 'center' }))
    }
  }, [logoPositionFlag])

  useEffect(() => {
    if (copyVariantFlag !== undefined) {
      setFlags(prev => ({ ...prev, copyVariant: copyVariantFlag as 'original' | 'alternative' | 'concise' }))
    }
  }, [copyVariantFlag])

  useEffect(() => {
    if (heroLayoutFlag !== undefined) {
      setFlags(prev => ({ ...prev, heroLayout: heroLayoutFlag as 'default' | 'compact' | 'expanded' }))
    }
  }, [heroLayoutFlag])

  return flags
}

// Individual flag hooks for convenience
export function useLogoPosition() {
  const { logoPosition } = useFeatureFlags()
  return logoPosition
}

export function useCopyVariant() {
  const { copyVariant } = useFeatureFlags()
  return copyVariant
}

export function useHeroLayout() {
  const { heroLayout } = useFeatureFlags()
  return heroLayout
}