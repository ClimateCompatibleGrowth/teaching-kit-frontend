import axios, { AxiosError } from 'axios'
// import FormData from 'form-data';
import type { NextApiResponse } from 'next'
import { headers } from 'next/headers';
import { NextRequest } from 'next/server'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// See documentation in /docs/zenodo/design.md
export async function POST(
  req: NextRequest,
  response: NextApiResponse
) {
  try {
    const formData = await req.formData()
    console.log('formdata', formData);

    const courseTitle = formData.get("title")
    const courseAbstract = formData.get("abstract")
    const courseFiles = formData.getAll("courseFiles") as File[]
    console.log(courseFiles);

    let lectureIndex = 0
    let lectureIds = []
    while (lectureIndex < 10) {
      const lectureTitle = formData.get(`lecture-${lectureIndex}-title`)
      const lectureAbstract = formData.get(`lecture-${lectureIndex}-abstract`)
      const lectureFiles = formData.getAll(`lecture-${lectureIndex}-files`) as File[]

      if (!lectureTitle || !lectureAbstract) {
        break
      }

      const newLecture = await axios.post(`${process.env.STRAPI_API_URL}/lectures?locale=en`,
        {
          data: {
            Title: `UNVERIFIED-${lectureTitle}`,
            Abstract: lectureAbstract,
            publishedAt: null // So it is not automatically published
          }
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_SUBMIT_KEY}`
          },
        })
      lectureIds.push(newLecture.data.data.id)
      if (lectureFiles && lectureFiles.every(file => file.size > 0)) {
        const fileForm = new FormData()
        lectureFiles.forEach(lectureFile => {
          fileForm.append("files", lectureFile, `UNVERIFIED-${lectureFile.name}`)
        });
        fileForm.append("ref", "api::lecture.lecture")
        fileForm.append("refId", newLecture.data.data.id)
        fileForm.append("field", "Files")
        await axios.post(`${process.env.STRAPI_API_URL}/upload`,
          fileForm,
          {
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_API_SUBMIT_KEY}`
            },
          })
      }

      lectureIndex++;
    }
    const newCourse = await axios.post(`${process.env.STRAPI_API_URL}/courses`, {
      locale: "en",
      data: {
        Title: `UNVERIFIED-${courseTitle}`,
        Abstract: courseAbstract,
        Lectures: lectureIds.length > 0 ? {
          connect: lectureIds.map((lectureId) => ({ id: lectureId, locale: 'en', status: 'draft' }))
        } : null,
        publishedAt: null // So it is not automatically published
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

    return response.json(null)
  } catch (error: any) {
    console.log(error.response);
    return response.json(null)
  }
}
