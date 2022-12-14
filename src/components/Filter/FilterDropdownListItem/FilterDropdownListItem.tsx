import React from 'react'

import { ClickableListItem, ListItem } from './styles'

type Props = {
  label: string
  onClick: () => void
  icon?: JSX.Element
  ariaPressed: boolean
}

const FilterDropdownListItem = ({
  label,
  onClick,
  icon,
  ariaPressed,
}: Props) => {
  return (
    <ListItem>
      <ClickableListItem onClick={onClick} aria-pressed={ariaPressed}>
        {icon}
        {label}
      </ClickableListItem>
    </ListItem>
  )
}

export default FilterDropdownListItem
