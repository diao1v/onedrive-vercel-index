import React from 'react'
import Image from 'next/image' // Import the Image component from Next.js
import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

import type { GalleryImageItem } from '../types'

type ImageItem = {
  original: string
  thumbnail: string
  width: number
  height: number
  alt?: string
}

const GalleryImageItem: React.FC<ImageItem> = ({ original, thumbnail, width, height, alt }) => {
  return (
    <Item original={original} thumbnail={thumbnail} width={width} height={height} alt={alt}>
      {({ ref, open }) => (
        <Image
          className="relative h-40 w-52 cursor-pointer object-cover"
          src={thumbnail}
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

const ImageGallery: React.FC = () => {
  const images: ImageItem[] = [
    {
      original: 'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
      thumbnail: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
      width: 1600,
      height: 1068,
      alt: 'Photo of mountain lake by Samuel Rohl',
    },
    {
      original: 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg',
      thumbnail: 'https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg',
      width: 1600,
      height: 1600,
      alt: 'Photo of seashore by Folkert Gorter',
    },
    {
      original: 'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
      thumbnail: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
      width: 1600,
      height: 1068,
      alt: 'Photo of mountain lake by Samuel Rohl',
    },
    {
      original: 'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
      thumbnail: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
      width: 1600,
      height: 1068,
      alt: 'Photo of mountain lake by Samuel Rohl',
    },
    {
      original: 'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
      thumbnail: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
      width: 1600,
      height: 1068,
      alt: 'Photo of mountain lake by Samuel Rohl',
    },
    {
      original: 'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
      thumbnail: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
      width: 1600,
      height: 1068,
      alt: 'Photo of mountain lake by Samuel Rohl',
    },
    {
      original: 'https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg',
      thumbnail: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
      width: 1600,
      height: 1068,
      alt: 'Photo of mountain lake by Samuel Rohl',
    },
  ]

  return (
    <Gallery>
      <div className="flex w-full flex-row flex-wrap gap-2">
        {images.map((image, index) => (
          <GalleryImageItem
            key={index}
            original={image.original}
            thumbnail={image.thumbnail}
            width={image.width}
            height={image.height}
            alt={image.alt}
          />
        ))}
      </div>
    </Gallery>
  )
}

export default ImageGallery
