import Block from "./Block";
import styles from "./Block.module.css";


export default function Blocks(blocks: any) {
  return (
    <ul className={styles.ul}>
      {blocks?.blocks.map((block: any) => (
        <li key={block.id} className={styles.li}>
            <Block block={block.attributes}/>
        </li>
      ))}
    </ul>
  );
}
