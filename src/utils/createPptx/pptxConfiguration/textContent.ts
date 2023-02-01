import PptxGenJS from 'pptxgenjs'
import { toPercentage, startXPos, X_PADDING, Y_PADDING } from './utils'

const PRIMARY_CONTENT_WIDTH = 65
const ESTIMATED_SLIDE_TITLE_HEIGHT = 30

export type ListStyle = 'UNORDERED' | 'ORDERED'

export const getPrimaryContentStyling = (
  listStyle?: ListStyle
): PptxGenJS.TextPropsOptions => {
  return getListContentStyling(primaryContentStyling, listStyle)
}

export const getSecondaryContentStyling = (
  listStyle?: ListStyle
): PptxGenJS.TextPropsOptions => {
  return getListContentStyling(secondaryContentStyling, listStyle)
}

export const getFallbackContentStyling = (
  listStyle?: ListStyle
): PptxGenJS.TextPropsOptions => {
  return getListContentStyling(fallbackContentStyling, listStyle)
}

const getListContentStyling = (
  baseStyling: PptxGenJS.TextPropsOptions,
  listStyle?: ListStyle
): PptxGenJS.TextPropsOptions => {
  if (listStyle === undefined) {
    return baseStyling
  }

  const listConfig = getListConfig(listStyle)

  return {
    ...baseStyling,
    bullet: listConfig,
  }
}

const getListConfig = (listStyle: ListStyle) => {
  const orderedListConfig = {
    type: 'number',
  } as const
  return listStyle === 'UNORDERED' ? true : orderedListConfig
}

const primaryContentStyling: PptxGenJS.TextPropsOptions = {
  x: startXPos,
  y: toPercentage(Y_PADDING + ESTIMATED_SLIDE_TITLE_HEIGHT),
  w: toPercentage(PRIMARY_CONTENT_WIDTH - X_PADDING),
  h: 0.75,
  fontSize: 16,
  autoFit: true,
}

const secondaryContentStyling: PptxGenJS.TextPropsOptions = {
  x: '70%',
  y: '50%',
  w: '30%',
  h: 0.5,
  breakLine: true,
}

const fallbackContentStyling: PptxGenJS.TextPropsOptions = {
  x: '70%',
  y: '80%',
  w: '30%',
  h: 0.5,
  fontSize: 16,
  autoFit: true,
}
