import type { OdFileObject } from '../../types'

import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { PreviewContainer, DownloadBtnContainer } from './Containers'
import DownloadButtonGroup from '../DownloadBtnGtoup'
import { getStoredToken } from '../../utils/protectedRouteHandler'

const ImagePreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const { asPath } = useRouter()
  const hashedToken = getStoredToken(asPath)

  // State variables to store the maximum allowed dimensions
  const [maxWidth, setMaxWidth] = useState(window.innerWidth)
  const [maxHeight, setMaxHeight] = useState(window.innerHeight)

  // Update the maximum dimensions when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setMaxWidth(window.innerWidth)
      setMaxHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Calculate the actual dimensions of the image
  const actualWidth = file.image?.width || 0
  const actualHeight = file.image?.height || 0

  // Calculate the dimensions to fit within the maximum allowed dimensions
  const scaleFactor = Math.min(maxWidth / actualWidth, maxHeight / actualHeight)
  const scaledWidth = actualWidth * scaleFactor
  const scaledHeight = actualHeight * scaleFactor

  return (
    <>
      <PreviewContainer>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="mx-auto"
          src={`/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`}
          alt={file.name}
          width={scaledWidth}
          height={scaledHeight}
        />
      </PreviewContainer>
      <DownloadBtnContainer>
        <DownloadButtonGroup />
      </DownloadBtnContainer>
    </>
  )
}

export default ImagePreview
