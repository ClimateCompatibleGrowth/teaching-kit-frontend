import PptxGenJS from 'pptxgenjs'
import { Author, Data } from '../../../../types'
import {
  descriptionSlideAuthor,
  descriptionTitle,
  disclaimerStyling,
} from '../../pptxConfiguration/slideElements'

const createTitleSlide = (
  lectureTitle: string,
  pptx: PptxGenJS,
  authors?: Data<Author>[]
) => {
  const descriptionSlide = pptx.addSlide()
  descriptionSlide.addText(`${lectureTitle}`, descriptionTitle)

  descriptionSlide.addShape(pptx.ShapeType.rect, {
    x: 0.0,
    y: 6.5,
    w: '100%',
    h: 0.85,
    fill: { color: 'F1F1F1' },
  })
  if (authors && authors?.length > 1) {
    const authorsString = `Authors: ${authors
      ?.map(
        (author) =>
          `${author.attributes.FirstName} ${author.attributes.LastName}`
      )
      .join(', ')}`

    descriptionSlide.addText(authorsString, descriptionSlideAuthor)
  } else if (authors && authors?.length === 1) {
    const authorsString = `Author: ${authors?.map(
      (author) => `${author.attributes.FirstName} ${author.attributes.LastName}`
    )}`
    descriptionSlide.addText(authorsString, descriptionSlideAuthor)
  } else {
    return
  }

  const disclaimertext =
    'These teaching materials are based on content provided by Climate Compatible Growth as part of their FCDO-funded activities. As this content can be adapted by other institutions, the opinions expressed here may not reflect those of CCG or its funders.'

  descriptionSlide.addText(disclaimertext, disclaimerStyling)
}
export default createTitleSlide
