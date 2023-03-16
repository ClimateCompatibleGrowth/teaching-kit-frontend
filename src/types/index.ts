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
  ORCID: string
  Email: string
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

type StrapiBaseEntry = {
  createdAt: string
  updatedAt: string
  publishedAt: string
  locale: Locale
  versionNumber: number | null
}

export type Block = StrapiBaseEntry & {
  Title: string
  Abstract: string
  DurationInMinutes: number
  Document: string
  References: string
  vuid: string
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

export type Lecture = StrapiBaseEntry & {
  Title: string
  Abstract: string
  Acknowledgement: string
  CiteAs: string
  vuid: string
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

export type Course = StrapiBaseEntry & {
  Title: string
  Abstract: string
  Acknowledgement: string
  CiteAs: string
  vuid: string
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

type Image = {
  name: string
  alternativeText: string
  caption: string | null
  url: string
  width: number
  height: number
}

type HeroImage = {
  data: Data<Image>
}

type InfoCard = {
  id: number
  Header: string
  Content: string
}

type InfoCardLarge = {
  id: number
  Header: string
  Content: string
  Image: {
    data: Data<Image>
  }
}

export type StartPageCopy = StrapiBaseEntry & {
  HeroImage: HeroImage
  Header: string
  HeaderParagraph: string
  PrimaryCallToActionButtonLabel: string
  InfoCardHeader: string
  InfoCards: InfoCard[]
  InfoCardsLarge: InfoCardLarge[]
  DynamicContentHeader: string
  DynamicContentButtonLabel1: string
  DynamicContentButtonLabel2: string
  BottomTextColumn1: string
  BottomTextColumn2: string
  FooterHeader: string
  FooterContent: string
}

type DropdownCopy = {
  Label: string
  Placeholder: string
  AriaLabel: string
}

export type FilterPageCopy = StrapiBaseEntry & {
  Header: string
  FilterHeader: string
  KeywordDropdown: DropdownCopy
  AuthorDropdown: DropdownCopy
  DefaultFilterResultHeader: string
  FilterResultHeader: string
  CourseLabel: string
  LectureLabel: string
  BlockLabel: string
}

export type GeneralCopy = StrapiBaseEntry & {
  TranslationDoesNotExist: string
}

export type LandingPageCopy = StrapiBaseEntry & {
  DescriptionHeader: string
  Authors: string
  DownloadContent: string
  PowerpointDownloadDescription: string
  DocxDownloadDescription: string
  IntermediateHeader: string
  WasCreatedAt: string
  WasUpdatedAt: string
  AlsoPartOf?: string
}
