import Image from 'next/image'
import type { RenderPhotoProps } from 'react-photo-album'

import { singleColorDataUrl } from '../../../utils/dynamicBlurDataUrl'

export default function AlbumNextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  const singleColorBlurData = singleColorDataUrl()

  return (
    <div style={{ ...wrapperStyle, position: 'relative' }}>
      <Image
        fill
        unoptimized={true}
        src={photo}
        placeholder="blur"
        blurDataURL={singleColorBlurData}
        {...{ alt, title, className, onClick }}
        quality={75}
        sizes="25vh"
      />
    </div>
  )
}
