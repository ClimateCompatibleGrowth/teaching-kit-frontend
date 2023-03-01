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

export const blockSortOptions: BlockSortOptions = {
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
