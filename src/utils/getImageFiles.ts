export const resizeImage = (originalWidth: number, originalHeight: number): {width: number, height:number} => {
  const maxWidth = 1024
  const maxHeight = 800

  if (originalWidth > originalHeight) {
    if (originalWidth > maxWidth) {
      const ratio = maxWidth / originalWidth
      return {
        width: maxWidth,
        height: Math.round(originalHeight * ratio),
      }
    } else {
      return {
        width: originalWidth,
        height: originalHeight,
      }
    }
  } else {
    if (originalHeight > maxHeight) {
      const ratio = maxHeight / originalHeight
      return {
        width: Math.round(originalWidth * ratio),
        height: maxHeight,
      }
    } else {
      return {
        width: originalWidth,
        height: originalHeight,
      }
    }
  }
}
