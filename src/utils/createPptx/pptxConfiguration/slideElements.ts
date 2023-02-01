import PptxGenJS from 'pptxgenjs'
import {
  remainingWidth,
  toPercentage,
  startXPos,
  X_PADDING,
  startYPos,
} from './utils'

export const slideHeading: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: startYPos,
  fontSize: 36,
  w: toPercentage(remainingWidth(2 * X_PADDING)),
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
  x: '70%',
  y: '5%',
  w: '25%',
  h: '30%',
}

export const citeAsStyling: PptxGenJS.TextPropsOptions = {
  x: '70%',
  y: '85%',
  fontSize: 12,
  w: '30%',
}
