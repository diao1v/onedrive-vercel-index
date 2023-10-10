import React from 'react'
import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';
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

      <Carousel withIndicators height={200}>
      <Carousel.Slide><img src='https://picsum.photos/id/1018/1000/600' /></Carousel.Slide>
      <Carousel.Slide><img src='https://picsum.photos/id/1015/1000/600' /></Carousel.Slide>
      <Carousel.Slide><img src='https://picsum.photos/id/1019/1000/600' /></Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
    )
}

export default ImageGallery