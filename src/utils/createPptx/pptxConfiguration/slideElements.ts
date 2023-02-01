import PptxGenJS from 'pptxgenjs'

const LOGO_WIDTH = 15
const LOGO_MARGIN = 2

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
  w: toPercentage(remainingWidth(2 * X_PADDING + LOGO_WIDTH + LOGO_MARGIN)),
  h: 0.75,
  breakLine: true,
}

export const descriptionSlideLogo: PptxGenJS.ImageProps = {
  x: toPercentage(remainingWidth(X_PADDING + LOGO_WIDTH + LOGO_MARGIN)),
  y: startYPos,
  w: toPercentage(LOGO_WIDTH), // It seems like we have to know the aspect ratio
  h: '30%', // It seems like we have to know the aspect ratio
  //  sizing: {
  //    type: 'contain',
  //    w: toPercentage(LOGO_WIDTH),
  //  },
}

export const descriptionSlideRec: any = {
  x: 0.0,
  y: 6.5,
  w: '100%',
  h: 0.75,
  fill: { color: 'F1F1F1' },
}
