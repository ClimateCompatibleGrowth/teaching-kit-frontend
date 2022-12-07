import React from 'react'
import { RemoveButton, StyledChip } from './styles'

type Props = {
  label: string
  id: string
  onDelete?: (id: string) => void
}

const Chip = ({ label, id, onDelete }: Props) => {
  return (
    <StyledChip>
      <p>{label}</p>
      {onDelete !== undefined ? (
        <RemoveButton
          onClick={() => onDelete(id)}
          aria-label={`Remove chip ${label}`}
        >
          x
        </RemoveButton>
      ) : undefined}
    </StyledChip>
  )
}

export default Chip
