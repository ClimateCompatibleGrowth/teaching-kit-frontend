import PptxGenJS from 'pptxgenjs'

export const singleHeading: PptxGenJS.TextPropsOptions = {
  x: '35%',
  y: '45%',
  fontSize: 42,
  w: '100%',
  autoFit: true,
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

export const bulletPoints: PptxGenJS.TextPropsOptions = {
  x: '70%',
  y: '50%',
  w: '30%',
  h: 0.5,
  bullet: true,
  breakLine: true,
}

export const mainContentStyling: PptxGenJS.TextPropsOptions = {
  x: 0.5,
  y: '40%',
  fontSize: 16,
  w: '65%',
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
