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

const blockSortOptionTypes = ['ALPHABETICAL_ASC', 'ALPHABETICAL_DESC'] as const
export type BlockSortOptionType = typeof blockSortOptionTypes[number]
export const isBlockSortOptionType = (
  sortOptionType: SortOptionType
): sortOptionType is BlockSortOptionType =>
  blockSortOptionTypes.some(
    (blockSortOptionType) => blockSortOptionType === sortOptionType
  )

export type SortOptionType = BlockSortOptionType | 'LEVEL_ASC' | 'LEVEL_DESC'

export type SortOption = Item<SortOptionType>

export type BlockSortOptions = {
  alphabeticalASC: SortOption
  alphabeticalDESC: SortOption
}

export type SortOptions = BlockSortOptions & {
  levelASC: SortOption
  levelDESC: SortOption
}

export const getBlockSortOptions = (locale: Locale) => {
  if (locale === 'es-ES') {
    return spanishBlockSortOptions
  }
  return blockSortOptions
}

export const getSortOptions = (locale: Locale) => {
  if (locale === 'es-ES') {
    return spanishSortOptions
  }
  return sortOptions
}

export const ALPHABETICAL_ASC = 'alphabeticalASC'
export const ALPHABETICAL_DESC = 'alphabeticalDESC'
export const LEVEL_ASC = 'levelASC'
export const LEVEL_DESC = 'levelDESC'

const blockSortOptions: BlockSortOptions = {
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

const spanishBlockSortOptions: BlockSortOptions = {
  [ALPHABETICAL_ASC]: {
    id: 'ALPHABETICAL_ASC',
    label: SPANISH_A_TO_Z,
    ariaLabel: `Alfabético ${SPANISH_A_TO_Z}`,
  },
  [ALPHABETICAL_DESC]: {
    id: 'ALPHABETICAL_DESC',
    label: SPANISH_Z_TO_A,
    ariaLabel: `Alfabético ${SPANISH_Z_TO_A}`,
  },
}

export const sortOptions: SortOptions = {
  ...blockSortOptions,
  [LEVEL_ASC]: {
    id: 'LEVEL_ASC',
    label: 'Beginner to Expert',
    ariaLabel: 'Level from expert to beginner',
  },
  [LEVEL_DESC]: {
    id: 'LEVEL_DESC',
    label: 'Expert to Beginner',
    ariaLabel: 'Level from expert to beginner',
  },
}

export const spanishSortOptions: SortOptions = {
  ...spanishBlockSortOptions,
  [LEVEL_ASC]: {
    id: 'LEVEL_ASC',
    label: 'Principiante a experto',
    ariaLabel: 'Nivel de principiante a experto',
  },
  [LEVEL_DESC]: {
    id: 'LEVEL_DESC',
    label: 'Experto a principiante',
    ariaLabel: 'Nivel de experto a principiante',
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
    case 'LEVEL_ASC':
      return LEVEL_ASC
    case 'LEVEL_DESC':
      return LEVEL_DESC
  }
}
