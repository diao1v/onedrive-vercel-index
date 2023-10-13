import React, { useState } from 'react'
import PhotoAlbum, { Photo } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

// import optional lightbox plugins
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

import { AlbumNextJsImage, LightboxNextJsImage } from './components'
import photos from './photos'
import type { GalleryImageItem } from '../../types/types'

type GalleryProps = {
  images: Photo[]
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [index, setIndex] = useState(-1)
  return (
    <>
      <PhotoAlbum
        layout="rows"
        photos={images}
        renderPhoto={AlbumNextJsImage}
        defaultContainerWidth={1200}
        sizes={{ size: 'calc(100vw - 240px)' }}
        targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        render={{ slide: LightboxNextJsImage }}
        // enable optional lightbox plugins
        // plugins={[Thumbnails, Zoom]}
      />
    </>
  )
}

export default Gallery
