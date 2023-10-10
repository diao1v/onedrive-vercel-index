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

  console.log('hashedToken in image preview: ', hashedToken)

  console.log('asPath in image preview: ', asPath)

  let height
  let width
  if (file.image?.height! > 800) {
    height = 800
    width = file.image?.width! * (800 / file.image?.height!)
  }

  return (
    <>
      <PreviewContainer>
        <Image
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
