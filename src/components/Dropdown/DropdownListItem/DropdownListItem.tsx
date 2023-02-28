import React, { HTMLAttributes } from 'react'

import * as Styled from './styles'

type Props = {
  label: string
  onClick: () => void
  icon?: JSX.Element
  isFocused?: boolean
  ariaLabel?: string
  ariaPressed: boolean
} & HTMLAttributes<HTMLLIElement>

const DropdownListItem = ({
  id,
  label,
  onClick,
  icon,
  isFocused,
  ariaLabel,
  ariaPressed,
}: Props) => {
  return (
    <Styled.ListItem isFocused={isFocused}>
      <Styled.ClickableListItem
        tabIndex={-1}
        id={id}
        onClick={onClick}
        aria-pressed={ariaPressed}
        aria-label={ariaLabel}
      >
        {icon}
        {label}
      </Styled.ClickableListItem>
    </Styled.ListItem>
  )
}

export default DropdownListItem
