import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import siteConfig from '../../../config/site.config'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Folders() {
  const { query, asPath, basePath } = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <Head>
        <title>{siteConfig.title}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col bg-gray-50 dark:bg-gray-800">
        <Navbar />
        <div className="mx-auto w-full max-w-5xl py-4 sm:p-4">
          {`query: ${JSON.stringify(query)}`}
          {`asPath: ${asPath}`}
          {`basePath: ${basePath}`}
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
