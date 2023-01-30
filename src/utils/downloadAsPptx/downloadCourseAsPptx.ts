import { CourseThreeLevelsDeep, Data } from '../../types'
import { lectureToPptx } from './downloadLectureAsPptx'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const downloadCoursePptx = async (course: Data<CourseThreeLevelsDeep>) => {
  const zip = new JSZip()

  for (const [index, lecture] of course.attributes.Lectures.data.entries()) {
    try {
      const pptx = await lectureToPptx(lecture)
      const blob = pptx.write()
      zip.file(`${index + 1}. ${lecture.attributes.Title}.pptx`, blob)
    } catch (error) {
      console.error(error)
      zip.file(
        `FAILED_${lecture.attributes.Title}.docx`,
        `Pptx generation failed for lecture ${lecture.attributes.Title}`
      )
    }
  }

  const generatedZip = await zip.generateAsync({ type: 'blob' })

  saveAs(generatedZip, `${course.attributes.Title}.zip`)
}

export default downloadCoursePptx
