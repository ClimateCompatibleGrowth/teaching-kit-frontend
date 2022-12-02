import { LearningOutcome } from "../../types";
import React from "react";

export type Props = {data?: LearningOutcome[] }

// Not in use right now
export default function LearningOutcomes({data}: Props) {
  return (
    <>
      <h2>Learning Outcomes</h2>
      <ul>
        {data?.map((lo: LearningOutcome) => (
          <li key={lo.id}>{lo.LearningOutcome}</li>
        ))}
      </ul>
    </>
  );
}