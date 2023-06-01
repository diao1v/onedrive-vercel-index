import Image from 'next/image'

const Logo = () => {
  const logoSrc = '~/public/icons/256.png'

  return (
    <div className="mx-auto my-10">
      <Image src={logoSrc} alt="stage 24 studio" width={150} height={150} />
    </div>
  )
}

export default Logo