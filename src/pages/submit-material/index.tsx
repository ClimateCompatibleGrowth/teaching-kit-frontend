import { FormEvent, useState } from "react"
import styled from '@emotion/styled'
import { DeleteOutlined } from "@mui/icons-material"
import z from "zod"
import { PageContainer, breakpoints, mq, Neutral40, Accent40, Error20 } from '../../styles/global'
import Button from "../../components/Button/Button"
import Link from "next/link"
import { LANGUAGES, LOCALES } from "../../types"
import { ubuntu } from "../../styles/fonts"

type LectureInput = {
  title: string;
  abstract: string;
  files?: FileList;
}

type FieldErrors = {
  email?: { _errors: string[] };
  courseTitle?: { _errors: string[] };
  courseAbstract?: { _errors: string[] };
  courseFiles?: { _errors: string[] };
  locale?: { _errors: string[] };
  lectures?: {
    title?: { _errors: string[] },
    abstract?: { _errors: string[] },
    files?: { _errors: string[] }
  }[] | undefined;
}

const Wrapper = styled.div`
  max-width: ${breakpoints.lg};
  margin: 0 auto;
  padding: 0 1.6rem;
  justify-content: space-between;
  font-size: 1.7rem;

  ${mq.md} {
    padding: 0 8rem;
  }

  a {
    color: ${Accent40};
    text-decoration: underline;
  }
`

const DeleteButton = styled(Button)`
  display: block;
  margin-left: auto;
  padding: .25rem .5rem;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 0 2rem;
`

const TermsLabel = styled.label`
  display: flex;
  padding: 0 0 2rem;
  align-items: center;

  input {
    width: 2rem;
    height: 2rem;
    padding-right: 1rem;
  }
`

const TermsAndConditions = styled.p`
  margin-left: 1rem;
  font-family: ${ubuntu[400].style.fontFamily};
  font-size: 1.4rem;
  line-height: 1.2;
`

const LectureWrapper = styled.fieldset`
  border: 1px dashed ${Neutral40};
  padding: 1rem;
  margin-bottom: 2rem;
`

const ErrorMessage = styled.span`
  color: ${Error20};
  font-size: 1.2rem;
  font-family: ${ubuntu[400].style.fontFamily};
`

export default function SubmitMaterial() {
  const acceptTypes = ".pdf,.docx,.pptx,ppt,.doc,.txt";
  const [errors, setErrors] = useState<FieldErrors>()
  const [email, setEmail] = useState<string>("a@a.se")
  const [courseAbstract, setCourseAbstract] = useState<string>("aa")
  const [courseTitle, setCourseTitle] = useState<string>("bb")
  const [courseFiles, setCourseFiles] = useState<FileList | null>()
  const [lectures, setLectures] = useState<LectureInput[]>([{ title: "lecture title", abstract: "lecture abstract", files: undefined }])

  function changeLecture(newLecture: LectureInput, newIndex: number) {
    const newLectures = lectures.map((lecture, index) => index === newIndex ? newLecture : lecture)
    console.log(lectures, newLectures);

    setLectures(newLectures)
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const courseSchema = z.object({
      email: z.coerce.string().email(),
      courseTitle: z.string(),
      courseAbstract: z.string(),
      courseFiles: z.instanceof(FileList).optional(),
      lectures: z.array(z.object({
        title: z.string(),
        abstract: z.string(),
        files: z.instanceof(FileList).optional()
      })).optional()
    });

    courseSchema.parse({
      email,
      courseTitle,
      courseAbstract,
      courseFiles,
      lectures
    })

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit-material', {
      method: 'POST',
      body: formData,
    })
    const responseData = await response.json()
    console.log(response.status, responseData);
    if (!response.ok) {
      setErrors(responseData)
    }
  }

  return <PageContainer hasTopPadding hasBottomPadding>
    <Wrapper>
      <h1>Submit teaching material</h1>
      <form onSubmit={onSubmit}>
        <Label>
          Contact email
          <input required name='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors?.email?._errors && <ErrorMessage role="alert">{errors?.email?._errors}</ErrorMessage>}
        </Label>
        <Label>
          Content language
          <select name="locale" defaultValue={LOCALES[0]}>
            {LOCALES.map((locale, i) => <option key={locale} value={locale}>{LANGUAGES[i]}</option>)}
          </select>
        </Label>
        <Label>
          Course title
          <input name='courseTitle' type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
          {errors?.courseTitle?._errors && <ErrorMessage role="alert">{errors?.courseTitle?._errors}</ErrorMessage>}
        </Label>
        <Label>
          Course abstract
          <textarea name='courseAbstract' rows={8} value={courseAbstract} onChange={e => setCourseAbstract(e.target.value)} />
          {errors?.courseAbstract?._errors && <ErrorMessage role="alert">{errors?.courseAbstract?._errors}</ErrorMessage>}
        </Label>
        <Label>
          Course materials
          <input name='courseFiles' type="file" multiple accept={acceptTypes} onChange={e => setCourseFiles(e.target.files)} />
          {errors?.courseFiles && errors?.courseFiles._errors && <ErrorMessage role="alert">{errors?.courseFiles._errors}</ErrorMessage>}
        </Label>
        {lectures.map((lecture, index) => {
          return <LectureWrapper key={index}>
            <legend>{`Lecture ${index + 1}`}</legend>
            <DeleteButton primary={false} type="button" onClick={(e) => { e.preventDefault(); setLectures(lectures.filter((_, j) => j !== index)) }} aria-label={`Delete lecture ${index + 1} from the course`}><DeleteOutlined fontSize="large" /></DeleteButton>
            <Label>
              Lecture title
              <input name={`lecture-${index}-title`} type="text" value={lecture.title} onChange={(e) => {
                changeLecture({ ...lecture, title: e.target.value }, index)
              }} />
              {errors?.lectures && errors.lectures[index] && errors.lectures[index].title?._errors && <ErrorMessage role="alert">{errors.lectures[index].title._errors}</ErrorMessage>}
            </Label>
            <Label>
              Lecture abstract
              <textarea name={`lecture-${index}-abstract`} rows={4} value={lecture.abstract} onChange={(e) => {
                changeLecture({ ...lecture, abstract: e.target.value }, index)
              }} />
              {errors?.lectures && errors.lectures[index] && errors.lectures[index].abstract?._errors && <ErrorMessage role="alert">{errors.lectures[index].abstract._errors}</ErrorMessage>}
            </Label>
            <Label>
              Lecture files
              <input name={`lecture-${index}-files`} type="file" multiple accept={acceptTypes} />
              {errors?.lectures && errors.lectures[index] && errors.lectures[index].files?._errors && <ErrorMessage role="alert">{errors.lectures[index].files._errors}</ErrorMessage>}
            </Label>
          </LectureWrapper>
        })}
        <LectureWrapper>
          <Button type="button" primary={false} onClick={() => { setLectures([...lectures, { title: '', abstract: '', files: undefined }]) }}>Add new lecture</Button>
        </LectureWrapper>
        <TermsLabel>
          <input type="checkbox" required />
          <TermsAndConditions>
            Climate Compatible Growth (#CCG) is a UK government, ODA-funded research programme supporting investment in sustainable energy and transport systems to meet development priorities. <Link href="/terms-and-conditions" target="_blank">Please read these Conditions of Use carefully.</Link>
          </TermsAndConditions>
        </TermsLabel>
        <Button type="submit">Submit</Button>
      </form>
    </Wrapper>
  </PageContainer >
}