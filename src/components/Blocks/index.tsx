import Block from "./Block";
import styles from "./Block.module.css";
import { Block as BlockType } from "../../types";

export type Props = { blocks?: BlockType[] };
export default function Blocks({ blocks }: Props) {
  return (
    <ul className={styles.ul}>
      {blocks?.map((block: any) => (
        <li key={block.id} className={styles.li}>
          <Block block={block.attributes} />
        </li>
      ))}
    </ul>
  );
}
