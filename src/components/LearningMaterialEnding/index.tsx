import React from "react";

export type Props = {
  Acknowledgment?: string;
  CiteAs?: string;
  References?: string;
};

export default function LearningMaterialEnding({
  Acknowledgment,
  CiteAs,
  References,
}: Props) {
  return (
    <>
      {Acknowledgment && (
        <>
          <h2>Acknowledgment</h2>
          <p>{Acknowledgment}</p>
        </>
      )}
      {CiteAs && (
        <>
          <h2>CiteAs</h2>
          <p>{CiteAs}</p>
        </>
      )}
      {References && (
        <>
          <h2>References</h2>
          <p>{References}</p>
        </>
      )}
    </>
  );
}
