import PptxGenJS from 'pptxgenjs'
import { Author, Data } from '../../../../types'
import {
  descriptionSlideAuthor,
  descriptionTitle,
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
    h: 0.75,
    fill: { color: 'F1F1F1' },
  })

  const authorsString = `Authors: ${authors
    ?.map((author) => author.attributes.Name)
    .join(', ')}`

  descriptionSlide.addText(authorsString, descriptionSlideAuthor)
}
export default createTitleSlide
