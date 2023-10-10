import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import { ImageGallery as LibImageGallery } from "react-image-gallery";
import type { GalleryImageItem } from '../types'

type GalleryProps = {
  images: GalleryImageItem[];
}



const ImageGallery: React.FC<GalleryProps> = ({images}) => {
  const imagesWithFormat = images?.map((image: GalleryImageItem) => {
    return {
      original: image.src,
      thumbnail: image.src,
    }
  })

  console.log('imagesWithFormat in ImageGallery: ', imagesWithFormat)
    
    const imagesSamples = [
      {
        original: "https://picsum.photos/id/1018/1000/600/",
        thumbnail: "https://picsum.photos/id/1018/250/150/",
      },
      {
        original: "https://picsum.photos/id/1015/1000/600/",
        thumbnail: "https://picsum.photos/id/1015/250/150/",
      },
      {
        original: "https://picsum.photos/id/1019/1000/600/",
        thumbnail: "https://picsum.photos/id/1019/250/150/",
      },
    ];

    return (

          <LibImageGallery items={imagesSamples} />

    )
}

export default ImageGallery