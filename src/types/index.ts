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
  Affiliation: { data: Data<Affiliation> | null }
}

export const learningMaterialTypes = ['COURSE', 'LECTURE'] as const
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
  isVisibleInListView: boolean
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
  localizations: {
    data: Data<Block>[]
  }
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
  Files: MediaFiles
  Blocks: { data: Data<Block>[] }
  LearningOutcomes: LearningOutcome[]
  LectureCreators: { data: Data<Author>[] }
  Courses: { data: Data<Course>[] }
  Level: { data?: Data<Level> }
  localizations: {
    data: Data<Lecture>[]
  }
}

export type LectureTwoLevelsDeep = Modify<
  LectureOneLevelDeep,
  {
    Blocks: { data: Data<BlockOneLevelDeep>[] }
    LectureCreators: { data: Data<AuthorOneLevelDeep>[] }
    Courses: { data: Data<CourseOneLevelDeep>[] }
  }
>

export type LectureTwoLevelsDeepWithOneLevelDeepLocalizations = Modify<
  LectureTwoLevelsDeep,
  {
    localizations: {
      data: Data<LectureOneLevelDeep>[]
    }
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
  Files: MediaFiles
  Logo?: MediaFile
  Lectures: { data: Data<Lecture>[] }
  CourseCreators: { data: Data<Author>[] }
  LearningOutcomes: LearningOutcome[]
  Prerequisites: Prerequisite[]
  Acknowledgement: string
  CiteAs: string
  Level: { data?: Data<Level> }
  localizations: {
    data: Data<Course>[]
  }
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

export type CourseThreeLevelsDeepWithThreeLevelsDeepLocalizations = Modify<
  CourseThreeLevelsDeep,
  {
    localizations: {
      data: Data<CourseThreeLevelsDeep>[]
    }
  }
>

export type DownloadableContent =
  | BlockOneLevelDeep
  | LectureTwoLevelsDeep
  | CourseThreeLevelsDeep

export const LOCALES = ['en', 'es-ES', 'fr-FR'] as const
export type Locale = typeof LOCALES[number]

export const LANGUAGES = ['English', 'Español', 'Français'] as const
export type Language = typeof LANGUAGES[number]

export type Path = {
  params: {
    vuid: string
  }
  locale?: string
}

export type MediaFile = {
  data: Data<{
    alternativeText: null | string,
    caption: null | string,
    createdAt: string,
    ext: string,
    hash: string,
    height: number | null,
    mime: string,
    name: string,
    previewUrl: string | null,
    provider: string | null,
    provider_metadata: null,
    size: number,
    updatedAt: string | null,
    url: string,
    width: number | null
  }> | null
}

export type MediaFiles = {
  data: Data<{
    alternativeText: null | string,
    caption: null | string,
    createdAt: string,
    ext: string,
    hash: string,
    height: number | null,
    mime: string,
    name: string,
    previewUrl: string | null,
    provider: string | null,
    provider_metadata: null,
    size: number,
    updatedAt: string | null,
    url: string,
    width: number | null
  }>[] | null
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

type DatastructureImage = {
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

export type StartPageCopy = StrapiBaseEntry &
  DataStructureCopy & {
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

export type DataStructureCopy = {
  HowTheTeachingMaterialIsStructured: string
  InfoTextCourseLectureLectureBlock: string
  InfoTextCourseStructure: string
  dataStructureDesktop: DatastructureImage
  dataStructureMobile: DatastructureImage
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
  LearningOutcomes?: string
  Prerequisites?: string
  Acknowledgement?: string
  CiteAs?: string
}
