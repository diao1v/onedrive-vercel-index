import type { OdFileObject } from '../../types'

import { FC } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { PreviewContainer, DownloadBtnContainer } from './Containers'
import DownloadButtonGroup from '../DownloadBtnGtoup'
import { getStoredToken } from '../../utils/protectedRouteHandler'

const ImagePreview: FC<{ file: OdFileObject }> = ({ file }) => {
  const { asPath } = useRouter()
  const hashedToken = getStoredToken(asPath)

  return (
    <>
      <PreviewContainer>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src={`/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`}
          alt={file.name}
          width={800}
          height={600}
        />
      </PreviewContainer>
      <DownloadBtnContainer>
        <DownloadButtonGroup />
      </DownloadBtnContainer>
    </>
  )
}

export default ImagePreview
