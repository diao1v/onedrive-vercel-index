import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import siteConfig from '../../../config/site.config'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

import { useProtectedSWRInfinite } from '../../utils/fetchWithSWR'
import { OdFolderChildren, OdFolderObject, GalleryImageItem } from '../../types'
import { getStoredToken } from '../../utils/protectedRouteHandler'


export default function Gallery() {
  const { query, asPath} = useRouter();
  const { path } = query;
  const hashedToken = getStoredToken(asPath)

  console.log('asPath in gallery: ', asPath)
  console.log('hashedToken: ', hashedToken)

  
  const folderPath = Array.isArray(path) && path.length > 1 ? '/' + path.slice(2).join('/') : '';

  const encodeFolderPath = encodeURIComponent(folderPath)
  const { data, error } = useProtectedSWRInfinite(`/${encodeFolderPath}`)

  const responses: any[] = data ? [].concat(...data) : []
    // Expand list of API returns into flattened file data
  const folderChildren = [].concat(...responses.map(r => r.folder.value)) as OdFolderObject['value']
  const imageGallery = folderChildren.map((child: OdFolderChildren) => { 
    let index = 0
    if (child.file?.mimeType.includes('image')) {
      const imageItem: GalleryImageItem = {
        index,
        id: child.id,
        src: `/api/raw/?path=${asPath}${hashedToken ? `&odpt=${hashedToken}` : ''}`,
        size: {
          width: child.image?.width || 0,
          height: child.image?.height || 0,
        }
      }
      index++
      return imageItem
      }
  })


  const folderChildrenImage = folderChildren.filter((child: OdFolderChildren) => child.file?.mimeType.includes('image'))
  


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>{siteConfig.title}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="mx-auto w-full max-w-5xl py-4 sm:p-4">
          {`This will be the gallery view`}
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
