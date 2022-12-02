import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { block } from "../../../pages/blocks/index";
import styles from "../../../styles/Blocks.module.css";

export default function Block(block: any) {
  const [showSlides, setShowSlides] = useState(false);

  return (
    <>
      <h2 className={styles.title} onClick={() => setShowSlides(!showSlides)}>
        Block: {block.block.Title}
      </h2>
      {showSlides && <ReactMarkdown>{block.block.Slides}</ReactMarkdown>}
    </>
  );
}
