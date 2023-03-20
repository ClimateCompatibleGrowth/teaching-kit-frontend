import { DEFAULT_LOCALE } from '../contexts/LocaleContext'
import { filterBlockOnKeywordsAndAuthors } from '../shared/requests/blocks/blocks'
import { ResponseArrayData } from '../shared/requests/types'
import { FilterParameters } from '../shared/requests/utils/utils'
import { Block } from '../types'
import { BlockSortOptionType } from '../types/filters'

export const getFilteredBlocks = async (
  args: FilterParameters<BlockSortOptionType>
): Promise<ResponseArrayData<Block>> => {
  const blocks = await filterBlockOnKeywordsAndAuthors(args)

  if (args.locale === DEFAULT_LOCALE) {
    return blocks
  }

  const translatedBlocks = blocks.data.map((block) => {
    const matchingLocale = block.attributes.localizations.data.find(
      (localization) => localization.attributes.locale === args.locale
    )
    if (matchingLocale) {
      return matchingLocale
    }
    return block
  })

  return {
    ...blocks,
    data: translatedBlocks,
  }
}
