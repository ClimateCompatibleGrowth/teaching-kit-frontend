import axios from 'axios'
import type { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import { courseSchema } from '../../../utils/validation';


// getLectureData function removed - now using direct upload approach

// Configure route segment config for this API route
export const maxDuration = 300 // 5 minutes for large file uploads
// See documentation in /docs/zenodo/design.md
export async function POST(
  req: NextRequest,
  response: NextApiResponse
) {
  try {
    if (process.env.NEXT_PUBLIC_ACCEPT_FORM_SUBMISSIONS !== 'true') {
      return new Response("{}", { status: 503 })
    }

    // Parse FormData
    const formData = await req.formData()
    const email = formData.get("email")
    const locale = formData.get("locale")
    const courseTitle = formData.get("courseTitle")
    const courseAbstract = formData.get("courseAbstract")
    const courseFiles = formData.getAll("courseFiles") as File[]
    
    // Parse lectures
    const lectures = []
    let lectureIndex = 0
    while (lectureIndex < 10) {
      const title = formData.get(`lecture-${lectureIndex}-title`)
      const abstract = formData.get(`lecture-${lectureIndex}-abstract`)
      const files = formData.getAll(`lecture-${lectureIndex}-files`) as File[]
      
      console.log('📝 Parsing lecture:', lectureIndex, {
        title,
        abstract,
        fileCount: files.length,
        files: files.map(f => f.name)
      })
      
      if (files.length === 0 && !abstract && !title) {
        break;
      }
      lectures.push({ title, abstract, files })
      lectureIndex++;
    }

    // Validate the data
    const inData = {
      email,
      locale,
      courseTitle,
      courseAbstract,
      courseFiles,
      lectures
    }

    const validationData = courseSchema.safeParse(inData)

    if (!validationData.success) {
      return new Response(JSON.stringify(validationData.error.format()), { status: 400 })
    }

    const lectureIds: number[] = await Promise.all(lectures.map(async (lecture: any) => {
      const newLecture = await axios.post(`${process.env.STRAPI_API_URL}/lectures`,
        {
          data: {
            Title: `UNVERIFIED-${lecture.title}`,
            Abstract: lecture.abstract,
            publishedAt: null, // So it is not automatically published
            locale,
          }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_SUBMIT_KEY}`
          },
        })
      const newLectureId = newLecture.data.data.id
      
      // Upload files directly to the lecture using Strapi's ref system
      if (lecture.files && lecture.files.length > 0) {
        console.log('🔗 Processing lecture files for lecture:', newLectureId, 'files:', lecture.files.length)
        const { uploadLectureFiles } = await import('../../../utils/directUpload')
        await uploadLectureFiles(
          lecture.files,
          process.env.STRAPI_API_URL || '',
          process.env.STRAPI_API_SUBMIT_KEY || '',
          newLectureId
        )
        console.log('🔗 Lecture files processed successfully for lecture:', newLectureId)
      } else {
        console.log('🔗 No files to upload for lecture:', newLectureId)
      }
      return newLectureId
    }));

    const newCourse = await axios.post(`${process.env.STRAPI_API_URL}/courses`, {
      locale,
      data: {
        Title: `UNVERIFIED-${courseTitle}`,
        Abstract: courseAbstract,
        Lectures: lectureIds.length > 0 ? {
          connect: lectureIds.map((lectureId) => ({ id: lectureId, locale, status: 'draft' }))
        } : null,
        publishedAt: null, // So it is not automatically published
        locale,
      }
    },
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_SUBMIT_KEY}`
        },
      })

    // Upload course files directly to the course using Strapi's ref system
    if (courseFiles && courseFiles.length > 0) {
      const { uploadCourseFiles } = await import('../../../utils/directUpload')
      await uploadCourseFiles(
        courseFiles,
        process.env.STRAPI_API_URL || '',
        process.env.STRAPI_API_SUBMIT_KEY || '',
        newCourse.data.data.id
      )
    }

    return new Response(null, { status: 204 })
  } catch (error: any) {
    console.error(error);

    return new Response(null, { status: 500 })
  }
}