import PptxGenJS from 'pptxgenjs'

type TextProps = PptxGenJS.TextPropsOptions

const commonConfiguration: TextProps = {
  bullet: false,
  indentLevel: 0,
  breakLine: false,
}

const commonParagraphConfiguration: TextProps = {
  ...commonConfiguration,
  fontSize: 18,
}

export const paragraphStyle: TextProps = {
  ...commonParagraphConfiguration,
}

export const strongStyle: TextProps = {
  ...commonParagraphConfiguration,
  bold: true,
}

export const italicStyle: TextProps = {
  ...commonParagraphConfiguration,
  italic: true,
}

export const listItemStyle: TextProps = {
  fontSize: 18,
}

export const h1Style: TextProps = {
  ...commonConfiguration,
  fontSize: 26,
  bold: true,
}

export const h2Style: TextProps = {
  ...commonConfiguration,
  fontSize: 22,
  bold: true,
}

export const h3Style: TextProps = {
  ...commonConfiguration,
  fontSize: 18,
  bold: true,
}
