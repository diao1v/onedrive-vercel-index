
export type FeatureFlags = {
  flagGalleryView: boolean
  flagDisableDownload: boolean
  flagUseCustomSlideInGallery: boolean
}

export const FEATURE_FLAGS: FeatureFlags = {
  flagGalleryView: false,
  flagDisableDownload: true,
  flagUseCustomSlideInGallery: true,
}
