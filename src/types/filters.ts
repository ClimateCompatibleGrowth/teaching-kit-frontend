import { Locale } from '.'
import {
  A_TO_Z,
  SPANISH_A_TO_Z,
  SPANISH_Z_TO_A,
  Z_TO_A,
} from '../components/TabGroup/translations'

export type Item<T = string> = {
  id: T
  label: string
  ariaLabel?: string
}

export type SortOptionType = 'ALPHABETICAL_ASC' | 'ALPHABETICAL_DESC'

export type SortOption = Item<SortOptionType>

export type SortOptions = {
  alphabeticalASC: SortOption
  alphabeticalDESC: SortOption
}

export const getSortOptions = () => {
  return sortOptions
}

export const ALPHABETICAL_ASC = 'alphabeticalASC'
export const ALPHABETICAL_DESC = 'alphabeticalDESC'

export const sortOptions: SortOptions = {
  [ALPHABETICAL_ASC]: {
    id: 'ALPHABETICAL_ASC',
    label: A_TO_Z,
    ariaLabel: 'Alphabetical from A to Z',
  },
  [ALPHABETICAL_DESC]: {
    id: 'ALPHABETICAL_DESC',
    label: Z_TO_A,
    ariaLabel: 'Alphabetical from Z to A',
  },
}

export const getSortOptionKey = (
  sortOptionType: SortOptionType
): keyof SortOptions => {
  switch (sortOptionType) {
    case 'ALPHABETICAL_ASC':
      return ALPHABETICAL_ASC
    case 'ALPHABETICAL_DESC':
      return ALPHABETICAL_DESC
  }
}
