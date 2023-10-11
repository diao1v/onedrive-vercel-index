export const dynamicBlurDataUrl = async (url: string) => {
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin

  const encodedUrl = encodeURIComponent(url)

  const blurImageUrl = `${baseURL}/_next/image?url=${encodedUrl}&w=256&q=40`

  const base64str = await fetch(blurImageUrl).then(async res => Buffer.from(await res.arrayBuffer()).toString('base64'))

  const blurSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 8 5'>
      <filter id="b" color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation="1" />
      </filter>
      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' width='100%' height='100%' href='data:image/webp;base64,${base64str}' />
    </svg>
    `

  const toBase64 = (str: string) =>
    typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`
}