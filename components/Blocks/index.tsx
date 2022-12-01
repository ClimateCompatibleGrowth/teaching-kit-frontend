import { block } from "../../pages/blocks/index";
import styles from "../../styles/Blocks.module.css";
import Block from "./block";

export default function Blocks(blocks: any) {
  return (
    <ul className={styles.ul}>
      {blocks?.blocks.map((block: block) => (
        <li key={block.id} className={styles.li}>
            <Block block={block.attributes}/>
        </li>
      ))}
    </ul>
  );
}
