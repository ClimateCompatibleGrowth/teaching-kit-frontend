import PptxGenJS from 'pptxgenjs'

const commonConfiguration: PptxGenJS.TextPropsOptions = {
  bullet: false,
  indentLevel: 0,
}

export const paragraphStyle: PptxGenJS.TextPropsOptions = {
  ...commonConfiguration,
  fontSize: 18,
}

export const listItemStyle: PptxGenJS.TextPropsOptions = {
  fontSize: 18,
}

export const h1Style: PptxGenJS.TextPropsOptions = {
  ...commonConfiguration,
  fontSize: 26,
  bold: true,
}

export const h2Style: PptxGenJS.TextPropsOptions = {
  ...commonConfiguration,
  fontSize: 22,
  bold: true,
}

export const h3Style: PptxGenJS.TextPropsOptions = {
  ...commonConfiguration,
  fontSize: 18,
  bold: true,
}
