import React from 'react'
import Image from 'next/image' // Import the Image component from Next.js
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

import type { GalleryImageItem } from '../types'

const GalleryImageItem: React.FC<GalleryImageItem> = ({ original_src, thumbnail_src, width, height, alt }) => {
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
  console.log('images in ImageGallery: ', images)
  return (
    <Gallery>
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
