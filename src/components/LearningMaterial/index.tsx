import React from "react";
import ReactMarkdown from "react-markdown";
import { LearningOutcome, Prerequisite } from "../../types";

export type Props = {
  Title: string;
  Abstract?: string;
  LearningOutcomes?: LearningOutcome[];
  Prerequisites?: Prerequisite[];
};

export default function LearningMaterial({
  Title,
  Abstract,
  LearningOutcomes,
  Prerequisites,
}: Props) {
  return (
    <>
      <h1>{Title}</h1>
      {Abstract && (
        <>
          <h2>Abstract</h2>
          <ReactMarkdown>{Abstract}</ReactMarkdown>
        </>
      )}
      {LearningOutcomes && (
        <>
          <h2>Learning Outcomes</h2>
          <ul>
            {LearningOutcomes?.map((learningOutcome: LearningOutcome) => (
              <li key={learningOutcome.id}>{learningOutcome.LearningOutcome}</li>
            ))}
          </ul>
        </>
      )}
      {Prerequisites && (
        <>
          <h2>Prerequisites</h2>
          <ul>
            {Prerequisites?.map((prerequisite: Prerequisite) => (
              <li key={prerequisite.id}>{prerequisite.Prerequisite}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
