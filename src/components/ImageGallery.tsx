import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

import type { GalleryImageItem } from '../types'
import { featureFlags } from '../utils'
import { dynamicBlurDataUrl } from '../utils/dynamicBlurDataUrl'
import { t } from 'i18next'

const GalleryImageItem: React.FC<GalleryImageItem> = ({ original_src, thumbnail_src, width, height, alt }) => {
  const [blurData, setBlurData] = useState(
    `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP09vZhAgACsQDmXwe6IgAAAABJRU5ErkJggg==`
  )

  useEffect(() => {
    const getBlurData = async () => {
      const blurDataUrl = await dynamicBlurDataUrl(thumbnail_src)
      setBlurData(blurDataUrl)
    }
    getBlurData()
  }, [])

  const {
    FEATURE_FLAGS: { flagUseCustomSlideInGallery },
  } = featureFlags

  const isHorizontal = width > height
  const ImageStyleSizes = isHorizontal ? { width: '80%', height: 'auto' } : { width: 'auto', height: '95%' }

  if (flagUseCustomSlideInGallery) {
    return (
      <Item
        content={
          <div className="flex h-full items-center justify-center">
            <Image
              src={original_src}
              width={width}
              height={height}
              sizes="90vh"
              style={{
                width: ImageStyleSizes.width,
                height: ImageStyleSizes.height,
              }}
              alt={alt ?? ''}
              quality={75}
              placeholder="blur"
              blurDataURL={blurData}
            />
          </div>
        }
      >
        {({ ref, open }) => (
          <Image
            className="relative h-40 w-52 cursor-pointer object-cover"
            src={thumbnail_src}
            width={width}
            height={height}
            ref={ref as React.MutableRefObject<HTMLImageElement>}
            onClick={open}
            sizes="15vh"
            alt={alt ?? ''}
            quality={70}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP09vZhAgACsQDmXwe6IgAAAABJRU5ErkJggg=="
          />
        )}
      </Item>
    )
  }

  return (
    <Item original={original_src} thumbnail={thumbnail_src} width={width} height={height} alt={alt}>
      {({ ref, open }) => (
        <Image
          className="relative h-40 w-52 cursor-pointer object-cover"
          src={thumbnail_src}
          width={width}
          height={height}
          ref={ref as React.MutableRefObject<HTMLImageElement>}
          onClick={open}
          alt={alt ?? ''}
        />
      )}
    </Item>
  )
}

type GalleryProps = {
  images: GalleryImageItem[]
}

const ImageGallery: React.FC<GalleryProps> = ({ images }) => {
  // console.log('images in ImageGallery: ', images)
  return (
    <Gallery
      options={{
        preload: [1, 3],
        preloadFirstSlide: true,
      }}
    >
      <div className="flex w-full flex-row flex-wrap gap-2">
        {images.map((image, index) => (
          <GalleryImageItem
            key={index}
            original_src={image.original_src}
            thumbnail_src={image.thumbnail_src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            id={image.id}
          />
        ))}
      </div>
    </Gallery>
  )
}

export default ImageGallery
