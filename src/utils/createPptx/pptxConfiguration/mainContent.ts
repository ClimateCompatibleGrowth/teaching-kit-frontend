import PptxGenJS from 'pptxgenjs'
import {
  toPercentage,
  startXPos,
  X_PADDING,
  Y_PADDING,
  remainingHeight,
} from './utils'

const PRIMARY_CONTENT_WIDTH = 65
const ESTIMATED_SLIDE_TITLE_HEIGHT = 15
export const PRIMARY_CONTENT_MARGIN_RIGHT = 2

export type ListStyle = 'UNORDERED' | 'ORDERED'

export const getPrimaryContentStyling = (): PptxGenJS.TextPropsOptions => {
  return primaryContentStyling
}

const commonConfiguration = {
  autoFit: true,
  breakLine: true,
  valign: 'top' as const,
  h: toPercentage(
    remainingHeight(2 * Y_PADDING + ESTIMATED_SLIDE_TITLE_HEIGHT)
  ),
}

const primaryContentStyling: PptxGenJS.TextPropsOptions = {
  ...commonConfiguration,
  x: startXPos,
  y: toPercentage(Y_PADDING + ESTIMATED_SLIDE_TITLE_HEIGHT),
  w: toPercentage(PRIMARY_CONTENT_WIDTH - X_PADDING),
}
