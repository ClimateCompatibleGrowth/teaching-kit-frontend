import axios, { AxiosError } from 'axios'
// import FormData from 'form-data';
import type { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
import z, { RefinementCtx } from "zod"
import { LOCALES } from '../../../types';

const MAXIMUM_FILE_UPLOAD_SIZE = 50_000_000

const fileRefinement = (files: File[], ctx: RefinementCtx) => {
  if (files.length > 10) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: 10,
      type: "array",
      inclusive: true,
      message: "You can add at most 10 course files. Please contact us at ccg@lboro.ac.uk if you need to upload additional files.",
    });
  }
  const isTooBigfile = files.find(file => file.size > MAXIMUM_FILE_UPLOAD_SIZE)
  if (isTooBigfile) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: MAXIMUM_FILE_UPLOAD_SIZE / 1_000_000,
      type: "number",
      inclusive: true,
      message: `Each file must be at most ${MAXIMUM_FILE_UPLOAD_SIZE / 1_000_000}MB in size, please contact us at ccg@lboro.ac.uk if you need to upload bigger files.`,
    });
  }
}

const courseSchema = z.object({
  email: z.coerce.string().email({ message: "Please fill in a valid email." }),
  courseTitle: z.string().min(1, { message: "Please fill in a title for the course." }),
  courseAbstract: z.string().min(1, { message: "Please fill in an abstract for the course." }),
  courseFiles: z.array(
    z.instanceof(File))
    .superRefine(fileRefinement),
  locale: z.enum(LOCALES, { message: "A valid locale is needed." }),
  lectures: z.array(z.object({
    title: z.string().min(1, { message: "Please fill in a title for the lecture." }),
    abstract: z.string().min(1, { message: "Please fill in an abstract for the lecture." }),
    files: z.array(
      z.instanceof(File))
      .superRefine(fileRefinement),
  }))
});

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

// See documentation in /docs/zenodo/design.md
export async function POST(
  req: NextRequest,
  response: NextApiResponse
) {
  try {
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

    return new Response("{}")
  } catch (error: any) {
    console.log("/", error, error.response);
    return new Response("{}")
  }
}
