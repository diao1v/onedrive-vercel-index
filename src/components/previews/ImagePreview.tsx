import type { OdFileObject } from '../../types'

import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { PreviewContainer, DownloadBtnContainer } from './Containers'
import DownloadButtonGroup from '../DownloadBtnGtoup'
import { getStoredToken } from '../../utils/protectedRouteHandler'
import { t } from 'i18next'

const ImagePreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const { asPath } = useRouter()
  const hashedToken = getStoredToken(asPath)

  const isLandscape = file?.image?.width! > file?.image?.height!

  // Determine the dimensions based on the orientation
  const width = isLandscape ? 800 : undefined // Set width to 800 for landscape images
  const height = isLandscape ? undefined : 700 // Set height to 700 for portrait images

  return (
    <>
      <PreviewContainer>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={`/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`}
          alt={file.name}
          width={width}
          height={height}
        />
        <img
          className="mx-auto"
          src={`/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`}
          alt={file.name}
          width={width}
          height={height}
        />
      </PreviewContainer>
      <DownloadBtnContainer>
        <DownloadButtonGroup />
      </DownloadBtnContainer>
    </>
  )
}

export default ImagePreview
