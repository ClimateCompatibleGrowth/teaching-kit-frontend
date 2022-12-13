import { Data, Block as BlockType } from '../../../types'
import Block from './Block'
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
