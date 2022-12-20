import PptxGenJS from 'pptxgenjs'

export const masterDescriptionSlide = {
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
          x: 0.5,
          y: 6.5,
          w: 5.5,
          h: 0.75,
        },
      },
    },
    {
      image: {
        x: 11.3,
        y: 0.5,
        w: 1.67,
        h: 1.67,
        path: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/KTH_Royal_Institute_of_Technology_logo.svg/380px-KTH_Royal_Institute_of_Technology_logo.svg.png',
      },
    },
  ],
}

export const descriptionTitle: PptxGenJS.TextPropsOptions = {
  x: 0.5,
  y: 0.7,
  fontSize: 36,
  w: '100%',
  h: 0.75,
}

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
