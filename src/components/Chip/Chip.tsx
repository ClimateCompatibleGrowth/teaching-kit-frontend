import React from 'react'
import * as Styled from './styles'

type Props = {
  label: string
  id: string
  onDelete?: (id: string) => void
}

const Chip = ({ label, id, onDelete }: Props) => {
  return (
    <Styled.Chip>
      <p>{label}</p>
      {onDelete !== undefined ? (
        <Styled.RemoveButton
          onClick={() => onDelete(id)}
          aria-label={`Remove chip ${label}`}
        >
          x
        </Styled.RemoveButton>
      ) : undefined}
    </Styled.Chip>
  )
}

export default Chip
