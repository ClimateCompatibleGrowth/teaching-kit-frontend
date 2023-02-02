import PptxGenJS from 'pptxgenjs'
import {
  ESTIMATED_REASONABLE_IMAGE_HEIGHT,
  IMAGE_MARGIN_LEFT,
  IMAGE_WIDTH,
} from './image'
import {
  remainingWidth,
  toPercentage,
  startXPos,
  X_PADDING,
  startYPos,
  Y_PADDING,
} from './utils'

const SLIDE_HEADING_WIDTH = remainingWidth(
  2 * X_PADDING + IMAGE_WIDTH + IMAGE_MARGIN_LEFT
)

export const slideHeading: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: startYPos,
  fontSize: 36,
  w: toPercentage(SLIDE_HEADING_WIDTH),
  h: 0.75,
  breakLine: true,
}

export const h1Heading: PptxGenJS.TextPropsOptions = {
  x: 0.5,
  y: 0,
  fontSize: 24,
  w: '90%',
  h: 0.75,
  autoFit: true,
}

export const h2Heading: PptxGenJS.TextPropsOptions = {
  x: 0.5,
  y: 0,
  fontSize: 22,
  w: '90%',
  h: 0.75,
  autoFit: true,
}

export const h3Heading: PptxGenJS.TextPropsOptions = {
  x: 0.5,
  y: 0,
  fontSize: 20,
  w: '90%',
  h: 0.75,
  autoFit: true,
}

export const imageStyling: PptxGenJS.ImageProps = {
  x: toPercentage(X_PADDING + SLIDE_HEADING_WIDTH),
  y: startYPos,
  w: '25%',
  h: '30%',
  sizing: {
    type: 'contain',
    w: toPercentage(remainingWidth(X_PADDING * 2 + SLIDE_HEADING_WIDTH)),
    h: toPercentage(Y_PADDING + ESTIMATED_REASONABLE_IMAGE_HEIGHT),
  },
}

export const citeAsStyling: PptxGenJS.TextPropsOptions = {
  x: '70%',
  y: '85%',
  fontSize: 12,
  w: '30%',
}
