import PptxGenJS from 'pptxgenjs'

export const paragraphStyle: PptxGenJS.TextPropsOptions = {
  fontSize: 16,
  bullet: false,
}

export const h3Style: PptxGenJS.TextPropsOptions = {
  fontSize: 24,
  bold: true,
}

export const ulStyle: PptxGenJS.TextPropsOptions = {
  bullet: true,
  x: '70%',
  y: '80%',
  w: '30%',
  h: 0.5,
  autoFit: true,
  color: '000000',
  objectName: 'Text 2',
  line: {},
  lineSpacing: undefined,
  lineSpacingMultiple: undefined,
  breakLine: true,
}

export const olStyle: PptxGenJS.TextPropsOptions = {
  bullet: {
    type: 'number',
  },
  x: '70%',
  y: '80%',
  w: '30%',
  h: 0.5,
  autoFit: true,
  color: '000000',
  objectName: 'Text 2',
  line: {},
  lineSpacing: undefined,
  lineSpacingMultiple: undefined,
  breakLine: true,
}
