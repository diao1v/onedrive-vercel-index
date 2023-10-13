import Image from "next/image";
import type { RenderPhotoProps } from "react-photo-album";

export default function AlbumNextJsImage({
  photo,
  imageProps: { alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {

  console.log('photo in AlbumNextJsImage', photo)
  return (
    <div style={{ ...wrapperStyle, position: "relative" }}>
      <Image
        fill
        src={photo}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        {...{ alt, title, sizes, className, onClick }}
        quality={60}
      />
    </div>
  );
}