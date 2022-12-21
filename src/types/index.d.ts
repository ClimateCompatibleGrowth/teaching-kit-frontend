// if you use a type/interface in more than one place it goes into the ~src/types/index.d.ts file
// if you extend a type/interface, it can be declared locally, but as long as it doesn't get used more than once

export type Slide = {
  id: number;
  Title: string;
  Content: string;
  SpeakerNotes: string;
};

export type Prerequisite = {
  id: number;
  Prerequisite: string;
};

export type LearningOutcome = {
  id: number;
  LearningOutcome: string;
};

export type Affiliation = {
  id: number;
  attributes: {
    Affiliation: string;
    Authors: Author[];
  };
};

export type Author = {
  id: number;
  attributes: {
    Name: string;
    Email?: string;
    ORCID?: string;
    Affiliation: Affiliation;
  };
};

const learningMaterialTypes = ["COURSE", "LECTURE", "BLOCK"] as const;
export type LearningMaterialType = typeof learningMaterialTypes[number];

const levels = ["BEGINNER", "INTERMEDIATE", "EXPERT"] as const;
export type Level = typeof levels[number];

export type Course = {
  id: number;
  attributes: {
    Title: string;
    Abstract: string;
    LearningOutcomes: LearningOutcome[];
    Prerequisites: Prerequisite[];
    Level: Level;
    Acknowledgement: string;
    CiteAs: string;
    CourseCreator: { data: Author[]; }
    Lectures: { data: Lecture[] };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type Lecture = {
  id: number;
  attributes: {
    Title: string;
    Abstract: string;
    LearningOutcomes: LearningOutcome[];
    LectureCreator: { data: Author[]; }
    Level: Level;
    Acknowledgement: string;
    CiteAs: string;
    Blocks: { data: Block[] };
    Courses: { data: Course[] };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type Block = {
  id: number;
  attributes: {
    Title: string;
    Abstract: string;
    LearningOutcomes: LearningOutcome[];
    Authors: { data: Author[]; }
    DurationInMinutes: number;
    Document: string;
    Slides: Slide[];
    References: string;
    Lectures: { data: Lecture[] };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    // vuid: string;
    // versionNumber: number;
    // isVisibleInListView: boolean;
  };
};
