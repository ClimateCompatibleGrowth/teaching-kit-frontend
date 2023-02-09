import PptxGenJS from 'pptxgenjs'
import { IMAGE_MARGIN_LEFT, IMAGE_WIDTH } from './image'
import {
  remainingWidth,
  toPercentage,
  startXPos,
  X_PADDING,
  startYPos,
} from './utils'

export const SLIDE_HEADING_WIDTH = remainingWidth(
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

export const citeAsStyling: PptxGenJS.TextPropsOptions = {
  x: '70%',
  y: '85%',
  fontSize: 12,
  w: '30%',
}

export const descriptionSlideAuthor: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: 6.5,
  w: 5.5,
  h: 0.75,
}

export const descriptionTitle: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: startYPos,
  fontSize: 36,
  w: toPercentage(remainingWidth(2 * X_PADDING)),
  h: 0.75,
  breakLine: true,
}

export const descriptionSlideRec: any = {
  x: 0.0,
  y: 6.5,
  w: '100%',
  h: 0.75,
  fill: { color: 'F1F1F1' },
}
