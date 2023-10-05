import React, { createContext, useContext, useState } from 'react'

const initialFlags: FeatureFlags = {
  flagGalleryView: true,
  flagDisableDownload: true,
}
type FeatureFlags = {
  flagGalleryView: boolean
  flagDisableDownload: boolean
}

interface FeatureFlagContextType {
  featureFlags: FeatureFlags
  setFlags: (flags: FeatureFlags) => void
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined)

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [featureFlags, setFlags] = useState<FeatureFlags>(initialFlags)

  return <FeatureFlagContext.Provider value={{ featureFlags, setFlags }}>{children}</FeatureFlagContext.Provider>
}

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext)
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider')
  }
  return context
}
