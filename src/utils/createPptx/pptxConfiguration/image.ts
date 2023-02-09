import PptxGenJS from 'pptxgenjs'
import { getSlideHeadingWidth } from './slideElements'

import {
  remainingHeight,
  SLIDE_WIDTH_HEIGHT_RATIO,
  toPercentage,
  X_PADDING,
  Y_PADDING,
} from './utils'

export type Image = {
  dimensions: Dimensions
  path: string
  altText: string
}

type Dimensions = {
  w: number
  h: number
}

export const IMAGE_WIDTH = 30
export const IMAGE_MARGIN_LEFT = 5
export const IMAGE_Y_MARGIN = 5

export const getImageStyling = (
  allImagesOnSlide: Image[]
): PptxGenJS.ImageProps[] => {
  const amountOfImages = allImagesOnSlide.length
  const imagesTotalHeight = getAccumulatedImageHeight(allImagesOnSlide)
  const allowedHeight = remainingHeight(
    Y_PADDING * 2 + IMAGE_Y_MARGIN * (amountOfImages - 1)
  )
  const requiredScale = getImageScale(imagesTotalHeight, allowedHeight)
  const imagesWithScaledDimensions: Image[] = allImagesOnSlide.map((image) => ({
    ...image,
    dimensions: {
      w: requiredScale * image.dimensions.w,
      h: requiredScale * image.dimensions.h,
    },
  }))

  const newImageAttributesFittingSlide = generateImageProps(
    imagesWithScaledDimensions
  )

  return newImageAttributesFittingSlide
}

const getImageScale = (imagesTotalHeight: number, allowedHeight: number) =>
  Math.min(1, allowedHeight / imagesTotalHeight)

const getAccumulatedImageHeight = (images: Image[]) =>
  images.reduce((height, image) => (height += image.dimensions.h), 0)

const generateImageProps = (images: Image[]): PptxGenJS.ImageProps[] => {
  let occupiedHeight = Y_PADDING

  return images.map((image) => {
    const yPosition = occupiedHeight
    occupiedHeight += IMAGE_Y_MARGIN + image.dimensions.h
    return {
      altText: image.altText,
      path: image.path,
      x: toPercentage(
        X_PADDING + getSlideHeadingWidth(true) + IMAGE_MARGIN_LEFT
      ),
      y: toPercentage(yPosition),
      w: toPercentage(image.dimensions.w),
      h: toPercentage(image.dimensions.h),
    }
  })
}

export const getImageDimensions = (
  width: number,
  height: number
): Dimensions => {
  const aspectRatio = width / height
  const adjustedWidth = IMAGE_WIDTH
  const adjustedHeight = (IMAGE_WIDTH / aspectRatio) * SLIDE_WIDTH_HEIGHT_RATIO

  return {
    w: adjustedWidth,
    h: adjustedHeight,
  }
}
