import { Locale } from '.'

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

const blockSortOptions: BlockSortOptions = {
  alphabeticalASC: {
    id: 'ALPHABETICAL_ASC',
    label: 'A to Z',
    ariaLabel: 'Alphabetical from A to Z',
  },
  alphabeticalDESC: {
    id: 'ALPHABETICAL_DESC',
    label: 'Z to A',
    ariaLabel: 'Alphabetical from Z to A',
  },
}

const spanishBlockSortOptions: BlockSortOptions = {
  alphabeticalASC: {
    id: 'ALPHABETICAL_ASC',
    label: 'De la A a la Z',
    ariaLabel: 'Alfabético de la A a la Z',
  },
  alphabeticalDESC: {
    id: 'ALPHABETICAL_DESC',
    label: 'De la Z a la A',
    ariaLabel: 'Alfabético de la Z a la A',
  },
}

export const sortOptions: SortOptions = {
  ...blockSortOptions,
  levelASC: {
    id: 'LEVEL_ASC',
    label: 'Beginner to Expert',
    ariaLabel: 'Level from expert to beginner',
  },
  levelDESC: {
    id: 'LEVEL_DESC',
    label: 'Expert to Beginner',
    ariaLabel: 'Level from expert to beginner',
  },
}

export const spanishSortOptions: SortOptions = {
  ...spanishBlockSortOptions,
  levelASC: {
    id: 'LEVEL_ASC',
    label: 'Principiante a experto',
    ariaLabel: 'Nivel de principiante a experto',
  },
  levelDESC: {
    id: 'LEVEL_DESC',
    label: 'Experto a principiante',
    ariaLabel: 'Nivel de experto a principiante',
  },
}
