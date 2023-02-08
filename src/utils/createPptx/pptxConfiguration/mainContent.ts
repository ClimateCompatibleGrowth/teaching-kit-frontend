import PptxGenJS from 'pptxgenjs'
import { ESTIMATED_REASONABLE_IMAGE_HEIGHT } from './image'
import {
  toPercentage,
  startXPos,
  X_PADDING,
  Y_PADDING,
  remainingHeight,
  remainingWidth,
} from './utils'

const PRIMARY_CONTENT_WIDTH = 65
const ESTIMATED_SLIDE_TITLE_HEIGHT = 15
const PRIMARY_CONTENT_MARGIN_RIGHT = 2

const NON_PRIMARY_CONTENT_START_X_POS =
  X_PADDING + PRIMARY_CONTENT_WIDTH + PRIMARY_CONTENT_MARGIN_RIGHT

export type ListStyle = 'UNORDERED' | 'ORDERED'
type BulletAttribute =
  | true
  | {
      readonly type: 'number'
    }
  | undefined

export const getPrimaryContentStyling = (): PptxGenJS.TextPropsOptions => {
  return primaryContentStyling
}

export const getSecondaryContentStyling = (
  listStyle: ListStyle | undefined,
  slideHasImage: boolean
): PptxGenJS.TextPropsOptions => {
  const baseYPos = Y_PADDING + ESTIMATED_SLIDE_TITLE_HEIGHT

  // TODO the following could be made more dynamic once we start implementing the images
  const yPos = slideHasImage
    ? toPercentage(baseYPos + ESTIMATED_REASONABLE_IMAGE_HEIGHT)
    : toPercentage(baseYPos)

  return {
    ...secondaryContentStyling,
    bullet: getListConfig(listStyle),
    y: yPos,
  }
}

export const getFallbackContentStyling = (
  listStyle: ListStyle | undefined
): PptxGenJS.TextPropsOptions => {
  return {
    ...fallbackContentStyling,
    bullet: getListConfig(listStyle),
  }
}

const getListConfig = (listStyle?: ListStyle): BulletAttribute => {
  if (listStyle === undefined) {
    return undefined
  }
  const orderedListConfig = {
    type: 'number',
  } as const
  return listStyle === 'UNORDERED' ? true : orderedListConfig
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

const secondaryContentStyling: PptxGenJS.TextPropsOptions = {
  ...commonConfiguration,
  x: toPercentage(NON_PRIMARY_CONTENT_START_X_POS),
  y: '50%',
  w: toPercentage(remainingWidth(NON_PRIMARY_CONTENT_START_X_POS + X_PADDING)),
}

const fallbackContentStyling: PptxGenJS.TextPropsOptions = {
  ...commonConfiguration,
  x: toPercentage(NON_PRIMARY_CONTENT_START_X_POS),
  y: '80%',
  w: toPercentage(remainingWidth(NON_PRIMARY_CONTENT_START_X_POS + X_PADDING)),
}
