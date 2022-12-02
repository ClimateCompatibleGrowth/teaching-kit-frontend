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

export type Course = {
  id: number;
  attributes: {
    Title: string;
    Abstract: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Acknowledgement: string;
    Level: "Beginner" | "Intermediate" | "Expert" | null;
    CiteAs: string;
    CourseCreator: Author[];
    lectures: Lecture[];
    Prerequisites: Prerequisite[];
  };
};

export type Lecture = {
  id: number;
  attributes: {
    Title: string;
    Abstract: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Level: "Beginner" | "Intermediate" | "Expert" | null;
    Acknowledgement: string;
    CiteAs: string;
    LectureCreator: Author[];
    Blocks: Block[];
    Courses: Course[];
    LearningOutcomes: LearningOutcome[];
  };
};

export type Block = {
  id: number;
  attributes: {
    Title: string;
    Abstract: string;
    LearningOutcomes: LearningOutcome[];
    DurationInMinutes: number;
    Document: string;
    Slides: Slide[];
    Author: Author[];
    References: string;
    Lectures: Lecture[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    // vuid: string;
    // versionNumber: number;
    // isVisibleInListView: boolean;
  };
};