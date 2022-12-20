// if you use a type/interface in more than one place it goes into the ~src/types/index.d.ts file
// if you extend a type/interface, it can be declared locally, but as long as it doesn't get used more than once

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
  Authors: Author[]
}

export type Author = {
  Name: string
  Email?: string
  ORCID?: string
  Affiliation: Data<Affiliation>
}

const learningMaterialTypes = ['COURSE', 'LECTURE', 'BLOCK'] as const
export type LearningMaterialType = typeof learningMaterialTypes[number]

const levels = ['BEGINNER', 'INTERMEDIATE', 'EXPERT'] as const
export type Level = typeof levels[number]

export type Keyword = {
  Keyword: string
}

export type Block = {
  Title: string
  Abstract: string
  LearningOutcomes: LearningOutcome[]
  Authors: { data: Data<Author>[] }
  DurationInMinutes: number
  Document: string
  Slides: Slide[]
  References: string
  Lectures: { data: Data<Lecture>[] }
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type Lecture = {
  Title: string
  Abstract: string
  LearningOutcomes: LearningOutcome[]
  LectureCreator: { data: Data<Author>[] }
  Level: Level
  Acknowledgement: string
  CiteAs: string
  Courses: { data: Data<Course>[] }
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type LectureWithBlock = Lecture & {
  Blocks: { data: Data<Block>[] }
}

export type Course = {
  Title: string
  Abstract: string
  LearningOutcomes: LearningOutcome[]
  Prerequisites: Prerequisite[]
  Level: Level
  Acknowledgement: string
  CiteAs: string
  CourseCreator: { data: Data<Author>[] }
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export type CourseWithLecturesAndBlocks = Course & {
  Lectures: { data: Data<LectureWithBlock>[] }
}
