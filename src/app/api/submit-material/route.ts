import axios from 'axios'
import type { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import { courseSchema } from '../../../utils/validation';


const getLectureData = (formData: FormData) => {
  let lectureIndex = 0
  let lectures = []
  while (lectureIndex < 10) {
    const title = formData.get(`lecture-${lectureIndex}-title`)
    const abstract = formData.get(`lecture-${lectureIndex}-abstract`)
    const files = formData.getAll(`lecture-${lectureIndex}-files`) as File[]
    if (files.length === 0 && !abstract && !title) {
      break;
    }
    lectures.push({ title, abstract, files })
    lectureIndex++;
  }
  return lectures
}

// Configure route segment config for this API route
export const maxDuration = 300 

// See documentation in /docs/zenodo/design.md
export async function POST(
  req: NextRequest,
  response: NextApiResponse
) {
  try {
    if (process.env.NEXT_PUBLIC_ACCEPT_FORM_SUBMISSIONS !== 'true') {
      return new Response("{}", { status: 503 })
    }
    const formData = await req.formData()

    const email = formData.get("email")
    const locale = formData.get("locale")
    const courseTitle = formData.get("courseTitle")
    const courseAbstract = formData.get("courseAbstract")
    const courseFiles = formData.getAll("courseFiles") as File[]
    const lectures = getLectureData(formData)

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

    const lectureIds: number[] = await Promise.all(lectures.map(async lecture => {
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
      if (lecture.files && lecture.files.every(file => file.size > 0)) {
        const fileForm = new FormData()
        lecture.files.forEach(lectureFile => {
          fileForm.append("files", lectureFile, `UNVERIFIED-${lectureFile.name}`)
        });
        fileForm.append("ref", "api::lecture.lecture")
        fileForm.append("refId", newLectureId)
        fileForm.append("field", "Files")
        await axios.post(`${process.env.STRAPI_API_URL}/upload`,
          fileForm,
          {
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_API_SUBMIT_KEY}`
            },
          })
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

    if (courseFiles && courseFiles.every(file => file.size > 0)) {
      const fileForm = new FormData()
      courseFiles.forEach(courseFile => {
        fileForm.append("files", courseFile, `UNVERIFIED-${courseFile.name}`)
      });
      fileForm.append("ref", "api::course.course")
      fileForm.append("refId", newCourse.data.data.id)
      fileForm.append("field", "Files")
      await axios.post(`${process.env.STRAPI_API_URL}/upload`,
        fileForm, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_SUBMIT_KEY}`
        },
      })
    }

    return new Response(null, { status: 204 })
  } catch (error: any) {
    console.error(error);

    return new Response(null, { status: 500 })
  }
}
