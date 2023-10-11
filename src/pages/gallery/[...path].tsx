import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import siteConfig from '../../../config/site.config'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ImageGallery from '../../components/ImageGallery'

import { useProtectedSWRInfinite } from '../../utils/fetchWithSWR'
import { OdFolderChildren, OdFolderObject, GalleryImageItem } from '../../types'
import { getStoredToken } from '../../utils/protectedRouteHandler'

export default function Gallery() {
  const { asPath } = useRouter()
  const galleryRouteRegex = /\/gallery\/(.*)/

  const match = asPath.match(galleryRouteRegex)
  let protectedFolderPath = ''
  let endDirFolderPath = ''
  if (match) {
    endDirFolderPath = match[1]
    protectedFolderPath = endDirFolderPath.split('/')[0]
  }

  console.log('protectedFolderPath in gallery: ', protectedFolderPath)
  console.log('endDirFolderPath in gallery: ', endDirFolderPath)

  const hashedToken = getStoredToken(`/${endDirFolderPath}`)
  console.log('hashedToken in gallery: ', hashedToken)

  const { data, error } = useProtectedSWRInfinite(`/${endDirFolderPath}`)

  const responses: any[] = data ? [].concat(...data) : []
  // Expand list of API returns into flattened file data
  const folderChildren = [].concat(...responses.map(r => r.folder.value)) as OdFolderObject['value']

  const imageGallery = (folderChildren || []).reduce((acc: GalleryImageItem[], child: OdFolderChildren) => {
    if (child.file?.mimeType.includes('image')) {
      const encodeImageName = encodeURIComponent(child.name)
      const imageItem: GalleryImageItem = {
        id: child.id,
        original_src: `/api/raw/?path=${protectedFolderPath}/${encodeImageName}${
          hashedToken ? `&odpt=${hashedToken}` : ''
        }`,
        thumbnail_src: `/api/raw/?path=${protectedFolderPath}/${encodeImageName}${
          hashedToken ? `&odpt=${hashedToken}` : ''
        }`,
        width: child.image?.width || 900,
        height: child.image?.height || 600,
      }

      acc.push(imageItem) // Push the imageItem to the accumulator
    }

    return acc
  }, [])

  console.log('imageGallery: ', imageGallery)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>{siteConfig.title}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="mx-auto w-full max-w-5xl py-4 sm:p-4">
          {`gallery view`}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
