// if you use a type/interface in more than one place it goes into the ~src/types/index.d.ts file
// if you extend a type/interface, it can be declared locally, but as long as it doesn't get used more than once

export type Modify<T, R> = Omit<T, keyof R> & R

export type Data<T> = {
  id: number
  attributes: T
}

export type Slide = {
  id: string
  Title: string
  Content: string
  SpeakerNotes: string
}

export type Prerequisite = {
  id: number
  Prerequisite: string
}

export type LearningOutcome = {
  id: number
  LearningOutcome: string
}

export type Affiliation = {
  Affiliation: string
}

export type DeepAffiliation = Affiliation & {
  Authors: Data<Author[]>
}

export type Author = {
  FirstName: string
  LastName: string
  Email?: string
  ORCID?: string
}

export type AuthorOneLevelDeep = Author & {
  Affiliation: Data<Affiliation>
}

export const learningMaterialTypes = ['COURSE', 'LECTURE', 'BLOCK'] as const
export type LearningMaterialType = typeof learningMaterialTypes[number]

const levelNames = ['1. Beginner', '2. Intermediate', '3. Expert'] as const
export type LevelName = typeof levelNames[number]

export type Level = {
  Level: LevelName
}

export type Keyword = {
  Keyword: string
}

type BaseEntry = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  vuid: string
  locale: Locale
  versionNumber: number | null
}

export type Block = BaseEntry & {
  Title: string
  Abstract: string
  DurationInMinutes: number
  Document: string
  References: string
}

export type BlockOneLevelDeep = Block & {
  Authors: { data: Data<Author>[] }
  LearningOutcomes: LearningOutcome[]
  Slides: Slide[]
  Lectures: { data: Data<Lecture>[] }
  Keywords: { data: Data<Keyword>[] }
}

export type BlockTwoLevelsDeep = Modify<
  BlockOneLevelDeep,
  {
    Authors: { data: Data<AuthorOneLevelDeep>[] }
  }
>

export type Lecture = BaseEntry & {
  Title: string
  Abstract: string
  Acknowledgement: string
  CiteAs: string
}

export type LectureOneLevelDeep = Lecture & {
  Blocks: { data: Data<Block>[] }
  LearningOutcomes: LearningOutcome[]
  LectureCreators: { data: Data<Author>[] }
  Courses: { data: Data<Course>[] }
  Level: { data?: Data<Level> }
}

export type LectureTwoLevelsDeep = Modify<
  LectureOneLevelDeep,
  {
    Blocks: { data: Data<BlockOneLevelDeep>[] }
    LectureCreators: { data: Data<AuthorOneLevelDeep>[] }
    Courses: { data: Data<CourseOneLevelDeep>[] }
  }
>

export type Course = BaseEntry & {
  Title: string
  Abstract: string
  Acknowledgement: string
  CiteAs: string
}

export type CourseOneLevelDeep = Course & {
  Lectures: { data: Data<Lecture>[] }
  CourseCreators: { data: Data<Author>[] }
  LearningOutcomes: LearningOutcome[]
  Prerequisites: Prerequisite[]
  Acknowledgement: string
  CiteAs: string
  Level: { data?: Data<Level> }
}

export type CourseTwoLevelsDeep = Modify<
  CourseOneLevelDeep,
  {
    Lectures: { data: Data<LectureOneLevelDeep>[] }
    CourseCreators: { data: Data<AuthorOneLevelDeep>[] }
  }
>

export type CourseThreeLevelsDeep = Modify<
  CourseTwoLevelsDeep,
  {
    Lectures: { data: Data<LectureTwoLevelsDeep>[] }
  }
>

export type DownloadableContent =
  | BlockOneLevelDeep
  | LectureTwoLevelsDeep
  | CourseThreeLevelsDeep

export const locales = ['en', 'es-ES'] as const
export type Locale = typeof locales[number]

export type Path = {
  params: {
    vuid: string
  }
  locale?: string
}
