export const X_PADDING = 3
export const Y_PADDING = 10

// https://gitbrent.github.io/PptxGenJS/docs/usage-pres-options/#standard-slide-layouts
const SLIDE_WIDTH_IN_INCHES = 10
const SLIDE_HEIGHT_IN_INCHES = 5.625
export const SLIDE_WIDTH_HEIGHT_RATIO =
  SLIDE_WIDTH_IN_INCHES / SLIDE_HEIGHT_IN_INCHES

export const remainingWidth = (width: number): number => {
  return hundredRemains(width)
}

export const remainingHeight = (height: number): number => {
  return hundredRemains(height)
}

const hundredRemains = (subtract: number): number => 100 - subtract

export const toPercentage = (value: number): `${number}%` => {
  return `${value}%`
}

export const startXPos = toPercentage(X_PADDING)
export const startYPos = toPercentage(Y_PADDING)
