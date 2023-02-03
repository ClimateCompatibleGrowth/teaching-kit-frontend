import PptxGenJS from 'pptxgenjs'

export const IMAGE_WIDTH = 30
export const IMAGE_MARGIN_LEFT = 5
export const ESTIMATED_REASONABLE_IMAGE_HEIGHT = 40

export const getBaseImageStyling = (
  width: number,
  height: number
): PptxGenJS.ImageProps => {
  const aspectRatio = width / height
  const adjustedWidth = IMAGE_WIDTH
  const adjustedHeight = IMAGE_WIDTH / aspectRatio

  return {
    w: adjustedWidth,
    h: adjustedHeight,
  }
}
