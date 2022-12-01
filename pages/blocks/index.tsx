import axios from "axios";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import styles from "../../styles/PageBlocks.module.css";

export type block = {
  id: number;
  attributes: {
    Title: string;
    Slides: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    vuid: string;
    versionNumber: number;
    isVisibleInListView: boolean;
  };
};

export default function Blocks({ blocks }: any) {
  return (
    <div className="container">
      <h1>Blocks</h1>
      <ul className={styles.ul}>
        {blocks.map((block: block) => (
          <li key={block.id} className={styles.li}>
            <Link href={`/blocks/${encodeURIComponent(block.id)}`}>
              <h2>{block.attributes.Title}</h2>
              <ReactMarkdown>{block.attributes.Slides}</ReactMarkdown>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get(`${process.env.STRAPI_API_URL}blocks`);
  const blocks = res.data.data;

  return {
    props: { blocks },
  };
}
