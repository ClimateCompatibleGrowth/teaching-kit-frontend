import PptxGenJS from 'pptxgenjs'
import {
  remainingWidth,
  toPercentage,
  startXPos,
  X_PADDING,
  startYPos,
} from './utils'

const LOGO_WIDTH = 15
const LOGO_MARGIN = 2

export const descriptionTitle: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: startYPos,
  fontSize: 36,
  w: toPercentage(remainingWidth(2 * X_PADDING + LOGO_WIDTH + LOGO_MARGIN)),
  h: 0.75,
  breakLine: true,
}
