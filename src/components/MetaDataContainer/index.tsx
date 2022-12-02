import React from "react";
import styles from "./MetaDataContainer.module.css";
import { Author, Level } from "../../types";

export type Props = {
  typeOfLearningMaterial: string;
  level?: Level;
  duration?: string;
  authors?: { data: Author[] };
};

export default function MetaDataContainer({
  typeOfLearningMaterial,
  level,
  duration,
  authors,
}: Props) {

  const handleDocxDownload = () => {

  }

  const handlePptxDownload = () => {

  }

  return (
    <div className={styles.metaDataContainer}>
      <h3>About this {typeOfLearningMaterial}</h3>
      <p>Level: {level}</p>
      <p>Duration: {duration}</p>
      <h4>Authors</h4>
      <ul className={styles.ul}>
        {authors?.data.map((author: Author) => (
          <li key={author.id}>
            {author.attributes.Name}:{" "}
            <a href={`mailto:${author.attributes.Email}`}>
              {author.attributes.Email}
            </a>
          </li>
        ))}
      </ul>
      <h4>Download</h4>
      <div className={styles.downloadContainer}>
        <button onClick={handleDocxDownload}>Docx</button>
        <button onClick={handlePptxDownload}>Pptx</button>
      </div>
    </div>
  );
}
