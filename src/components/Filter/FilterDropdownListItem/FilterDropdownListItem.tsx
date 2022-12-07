import React from 'react'

import { ClickableListItem, ListItem } from './styles'

type Props = {
  label: string
  onClick: () => void
}

const FilterDropdownListItem = ({ label, onClick }: Props) => {
  return (
    <ListItem>
      <ClickableListItem onClick={onClick}>{label}</ClickableListItem>
    </ListItem>
  )
}

export default FilterDropdownListItem
