import React, { createContext, useContext, useState } from 'react'

interface FeatureFlags {
  [key: string]: boolean
}

interface FeatureFlagContextType {
  featureFlags: FeatureFlags
  setFlags: (flags: FeatureFlags) => void
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined)

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode; initialFlags?: FeatureFlags }> = ({
  children,
  initialFlags,
}) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>(initialFlags || {})

  const setFlags = (flags: FeatureFlags) => {
    setFeatureFlags(prevFlags => ({ ...prevFlags, ...flags }))
  }

  return <FeatureFlagContext.Provider value={{ featureFlags, setFlags }}>{children}</FeatureFlagContext.Provider>
}

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext)
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider')
  }
  return context
}
