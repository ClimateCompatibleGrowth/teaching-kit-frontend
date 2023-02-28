import React from 'react'
import * as Styled from './styles'

type Props = {
  label: string
  id: string
  onDelete?: (id: string) => void
  type?: string
}

const Chip = ({ label, id, onDelete, type = 'chip' }: Props) => {
  return (
    <Styled.Chip>
      <span>{label}</span>
      {onDelete !== undefined ? (
        <Styled.RemoveButton
          onClick={() => onDelete(id)}
          aria-label={`Remove ${type || ''} '${label}'`}
        >
          x
        </Styled.RemoveButton>
      ) : undefined}
    </Styled.Chip>
  )
}

export default Chip
