import {
  h1Heading,
  bulletPoints,
  mainContentStyling,
  h2Heading,
  h3Heading,
  singleHeading,
} from '../createPptx/createPptxStyling'
import { Data, LectureTwoLevelsDeep, Slide } from '../../types'
import { PptxSlide } from '../../types/pptx'
import { marked } from 'marked'
import { decode } from 'html-entities'

const downloadAsCoursePptx = (course: any) => {
  console.log('Only temporary file')
}

export default downloadAsCoursePptx
