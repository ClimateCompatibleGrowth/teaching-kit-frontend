import PptxGenJS from 'pptxgenjs'
import { remainingWidth, toPercentage } from './utils'

const X_PADDING = 3
const Y_PADDING = 10
const LOGO_WIDTH = 15
const LOGO_MARGIN = 2

// TODO:  Change to local img of CCG
const IMAGE_PATH =
  'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/KTH_Royal_Institute_of_Technology_logo.svg/380px-KTH_Royal_Institute_of_Technology_logo.svg.png'
// const IMAGE_PATH = '/public/logo.png'

export const masterDescriptionSlide: PptxGenJS.SlideMasterProps = {
  title: 'MASTER_DESCRIPTION_SLIDE',
  background: { color: 'FFFFFF' },
  objects: [
    {
      rect: {
        x: 0.0,
        y: 6.5,
        w: '100%',
        h: 0.75,
        fill: { color: 'F1F1F1' },
      },
    },
    {
      text: {
        text: `Author: Jimmy Rickardsson`,
        options: {
          x: toPercentage(X_PADDING),
          y: 6.5,
          w: 5.5,
          h: 0.75,
        },
      },
    },
    {
      image: {
        x: toPercentage(remainingWidth(X_PADDING + LOGO_WIDTH + LOGO_MARGIN)),
        y: toPercentage(Y_PADDING),
        w: toPercentage(LOGO_WIDTH), // It seems like we have to know the aspect ratio
        h: '30%', // It seems like we have to know the aspect ratio
        sizing: {
          type: 'contain',
          w: toPercentage(LOGO_WIDTH),
        },
        path: IMAGE_PATH,
      },
    },
  ],
}

export const descriptionTitle: PptxGenJS.TextPropsOptions = {
  x: toPercentage(X_PADDING),
  y: toPercentage(Y_PADDING),
  fontSize: 36,
  w: toPercentage(remainingWidth(2 * X_PADDING + LOGO_WIDTH + LOGO_MARGIN)),
  h: 0.75,
  breakLine: true,
}
