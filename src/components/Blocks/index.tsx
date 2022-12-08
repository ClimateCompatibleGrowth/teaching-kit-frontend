import Block from './Block'
import styles from './Block.module.css'
import { Block as BlockType, Data } from '../../types'

export type Props = { blocks?: Data<BlockType>[] }
export default function Blocks({ blocks }: Props) {
  return (
    <ul className={styles.ul}>
      {blocks?.map((block) => (
        <li key={block.id} className={styles.li}>
          <Block block={block.attributes} />
        </li>
      ))}
    </ul>
  )
}
