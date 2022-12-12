import Block from './Block'
import { Block as BlockType, Data } from '../../types'
import { StyledBlocks } from './styles'

export type Props = { blocks?: Data<BlockType>[] }
export default function Blocks({ blocks }: Props) {
  return (
    <StyledBlocks>
      {blocks?.map((block) => (
        <li key={block.id}>
          <Block block={block.attributes} />
        </li>
      ))}
    </StyledBlocks>
  )
}
