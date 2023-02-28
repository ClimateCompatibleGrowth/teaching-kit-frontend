import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'

import * as Styled from './styles'
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
} from '@mui/icons-material'
import DropdownListItem from '../DropdownListItem/DropdownListItem'

export type Item = {
  id: string
  label: string
  ariaLabel?: string
}

type Props = {
  id: string
  selectedItems: Item[]
  items: Item[]
  isSingleSelectable?: boolean
  selectedIndex: number
  toggleItem: (item: Item) => void
  maxAmountOfItems?: number
}

const DropdownList: ForwardRefRenderFunction<HTMLOListElement, Props> = (
  {
    id,
    isSingleSelectable,
    selectedItems,
    maxAmountOfItems = 20,
    items,
    selectedIndex,
    toggleItem,
  }: Props,
  ref: ForwardedRef<HTMLOListElement>
) => {
  const itemIsSelected = (item: Item) =>
    selectedItems.map((selectedItem) => selectedItem.id).includes(item.id)

  const getListItemCheckIcon = (item: Item) => {
    if (isSingleSelectable) {
      return undefined
    }
    return itemIsSelected(item) ? (
      <CheckBoxOutlined />
    ) : (
      <CheckBoxOutlineBlankOutlined />
    )
  }

  const showLimitedResultsList = items.length > maxAmountOfItems
  const results = [
    ...items
      .slice(
        0,
        items.length > maxAmountOfItems ? maxAmountOfItems : items.length
      )
      .map((item, index) => (
        <DropdownListItem
          id={`${id}-option-${index}`}
          key={item.label}
          label={item.label}
          onClick={() => toggleItem(item)}
          icon={getListItemCheckIcon(item)}
          isFocused={selectedIndex === index}
          ariaLabel={item.ariaLabel}
          ariaPressed={itemIsSelected(item)}
        />
      )),

    showLimitedResultsList ? (
      <Styled.MoreResultsInformation key='more-results'>{`... and ${
        items.length - maxAmountOfItems
      } more matches`}</Styled.MoreResultsInformation>
    ) : null,
  ]

  return (
    <Styled.DropdownList
      aria-multiselectable={!isSingleSelectable}
      ref={ref}
      id={id}
      tabIndex={-1}
    >
      {results}
    </Styled.DropdownList>
  )
}

export default forwardRef(DropdownList)
