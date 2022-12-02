import axios from "axios";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Block } from "../../src/types";
import styles from "../../styles/PageBlocks.module.css";


type props = { blocks: Block[] };

export default function Blocks({ blocks }: props) {
  console.log("blocks:", blocks);
  return (
    <div className="container">
      <h1>Blocks</h1>
      <ul className={styles.ul}>
        {blocks.map((block: Block) => (
          <li key={block.id} className={styles.li}>
            <Link href={`/blocks/${encodeURIComponent(block.id)}`}>
              <h2>{block.attributes.Title}</h2>
              <ReactMarkdown>{block.attributes.Abstract}</ReactMarkdown>
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
  console.log("res: ", res);

  return {
    props: { blocks },
  };
}
