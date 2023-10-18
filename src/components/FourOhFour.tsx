import Image from 'next/image'
import { Trans } from 'next-i18next'

const FourOhFour: React.FC<{ errorMsg: string }> = ({ errorMsg }) => {
  return (
    <div className="my-12">
      <div className="mx-auto w-1/3">
        <Image src="/images/fabulous-rip-2.png" alt="404" width={912} height={912} priority />
      </div>
      <div className="mx-auto mt-6 max-w-xl text-gray-500">
        <div className="mb-8 text-xl font-bold">
          <Trans>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Oops, that's a <span className="underline decoration-red-500 decoration-wavy">four-oh-four</span>.
          </Trans>
        </div>
        {/* <div className="mb-4 overflow-hidden break-all rounded border border-gray-400/20 bg-gray-50 p-2 font-mono text-xs dark:bg-gray-800">
          {errorMsg}
        </div> */}
        <div className="text-sm">
          <Trans>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-500 focus:outline-none"
            >
              Please refresh the page
            </button>
          </Trans>
        </div>
      </div>
    </div>
  )
}

export default FourOhFour
