import React, { useCallback, useEffect, useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { filterCourseOnKeywordsAndAuthors } from '../../shared/requests/courses/courses'
import { filterLectureOnKeywordsAndAuthors } from '../../shared/requests/lectures/lectures'
import {
  BlockOneLevelDeep,
  CourseThreeLevelsDeep,
  Data,
  LectureTwoLevelsDeep,
} from '../../types'
import { Metadata, ResponseArrayData } from '../../shared/requests/types'
import CardList from '../CardList/CardList'
import PaginationController from '../PaginationController/PaginationController'
import { CardType } from '../CardList/Card/Card'
import TabPanel from './TabPanel/TabPanel'

import * as Styled from './styles'
import { filterBlockOnKeywordsAndAuthors } from '../../shared/requests/blocks/blocks'
import TabLabel from './TabLabel/TabLabel'
import DropdownSingleSelectable, {
  Item,
} from '../Dropdown/DropdownSingleSelectable'
import { levelToString } from '../../utils/utils'
import LearningMaterialBadge from '../LearningMaterial/LearningMaterialBadge/LearningMaterialBadge'

type Props = {
  selectedKeywords: string[]
  selectedAuthors: string[]
}

const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_MATCHES_PER_PAGE = 10

const defaultPagination = {
  page: DEFAULT_PAGE_NUMBER,
  pageSize: DEFAULT_MATCHES_PER_PAGE,
  pageCount: 1,
  total: 0,
}

const defaultFilterResult: ResponseArrayData<any> = {
  data: [],
  meta: {
    pagination: defaultPagination,
  },
}

export type SortOptionType =
  | 'ALPHABETICAL_ASC'
  | 'ALPHABETICAL_DESC'
  | 'LEVEL_ASC'
  | 'LEVEL_DESC'

type SortOption = Item & {
  id: SortOptionType
}

type BlockSortOptions = {
  alphabeticalASC: SortOption
  alphabeticalDESC: SortOption
}

type SortOptions = BlockSortOptions & {
  levelASC: SortOption
  levelDESC: SortOption
}

const blockSortOptions: BlockSortOptions = {
  alphabeticalASC: {
    id: 'ALPHABETICAL_ASC',
    label: 'A - Z',
  },
  alphabeticalDESC: {
    id: 'ALPHABETICAL_DESC',
    label: 'Z - A',
  },
}

const sortOptions: SortOptions = {
  ...blockSortOptions,
  levelASC: {
    id: 'LEVEL_ASC',
    label: 'Beginner - Expert',
  },
  levelDESC: {
    id: 'LEVEL_DESC',
    label: 'Expert - Beginner',
  },
}

const TabGroup = ({ selectedKeywords, selectedAuthors }: Props) => {
  const [value, setValue] = React.useState(0)
  const [courseResults, setCourseResults] =
    useState<ResponseArrayData<CourseThreeLevelsDeep>>(defaultFilterResult)
  const [lectureResults, setLectureResults] =
    useState<ResponseArrayData<LectureTwoLevelsDeep>>(defaultFilterResult)
  const [blockResults, setBlockResults] =
    useState<ResponseArrayData<BlockOneLevelDeep>>(defaultFilterResult)
  const [currentCoursePageNumber, setCurrentCoursePageNumber] =
    useState(DEFAULT_PAGE_NUMBER)
  const [currentLecturePageNumber, setCurrentLecturePageNumber] =
    useState(DEFAULT_PAGE_NUMBER)
  const [currentBlockPageNumber, setCurrentBlockPageNumber] =
    useState(DEFAULT_PAGE_NUMBER)
  const [matchesPerPage, setMatchesPerPage] = useState(DEFAULT_MATCHES_PER_PAGE)
  const [sortMethod, setSortMethod] = useState<SortOption>(
    sortOptions.alphabeticalASC
  )

  const onCourseChange = useCallback(
    async (pageNumber: number) => {
      const courseFilterResult = await filterCourseOnKeywordsAndAuthors(
        selectedKeywords,
        selectedAuthors,
        pageNumber,
        sortMethod.id,
        matchesPerPage
      )

      setCourseResults(courseFilterResult)
    },
    [selectedKeywords, selectedAuthors, sortMethod, matchesPerPage]
  )

  const onLectureChange = useCallback(
    async (pageNumber: number) => {
      const lectureFilterResult = await filterLectureOnKeywordsAndAuthors({
        keywords: selectedKeywords,
        authors: selectedAuthors,
        pageNumber: pageNumber,
        sortMethod: sortMethod.id,
        matchesPerPage,
      })

      setLectureResults(lectureFilterResult)
    },
    [selectedKeywords, selectedAuthors, sortMethod, matchesPerPage]
  )

  const onBlockChange = useCallback(
    async (pageNumber: number) => {
      const blockFilterResult = await filterBlockOnKeywordsAndAuthors({
        keywords: selectedKeywords,
        authors: selectedAuthors,
        pageNumber: pageNumber,
        sortMethod: sortMethod.id,
        matchesPerPage,
      })

      setBlockResults(blockFilterResult)
    },
    [selectedKeywords, selectedAuthors, sortMethod, matchesPerPage]
  )

  useEffect(() => {
    onCourseChange(currentCoursePageNumber)
  }, [currentCoursePageNumber, onCourseChange])

  useEffect(() => {
    onLectureChange(currentLecturePageNumber)
  }, [currentLecturePageNumber, onLectureChange])

  useEffect(() => {
    onBlockChange(currentBlockPageNumber)
  }, [currentBlockPageNumber, onBlockChange])

  const blockDataToCardFormat = (
    data: Data<BlockOneLevelDeep>[]
  ): CardType[] => {
    return data.map((block) => ({
      title: block.attributes.Title,
      id: block.id.toString(),
      text: block.attributes.Abstract,
      href: `/blocks/${block.id}`,
      subTitle: <LearningMaterialBadge type='BLOCK' />,
    }))
  }

  const lectureDataToCardFormat = (data: Data<LectureTwoLevelsDeep>) => {
    const baseCard = dataToCardFormat(data)
    return {
      ...baseCard,
      href: `/lectures/${data.id}`,
      subTitle: <LearningMaterialBadge type='LECTURE' />,
    }
  }

  const courseDataToCardFormat = (
    data: Data<CourseThreeLevelsDeep>
  ): CardType => {
    const baseCard = dataToCardFormat(data)
    return {
      ...baseCard,
      href: `/courses/${data.id}`,
      subTitle: <LearningMaterialBadge type='COURSE' />,
    }
  }

  const dataToCardFormat = (
    learningMaterial: Data<LectureTwoLevelsDeep> | Data<CourseThreeLevelsDeep>
  ): CardType => {
    const level = levelToString(learningMaterial.attributes.Level)
    return {
      title: learningMaterial.attributes.Title,
      id: learningMaterial.id.toString(),
      text: learningMaterial.attributes.Abstract,
      metadata: level !== undefined ? `Level: ${level}` : undefined,
    }
  }

  const getPaginationController = (
    metaData: Metadata,
    currentPage: number,
    setCurrentPageNumber: (newPageNumber: number) => void
  ) => {
    return metaData.pagination.pageCount > 1 ? (
      <PaginationController
        amountOfPages={metaData.pagination.pageCount}
        currentPageNumber={currentPage}
        setCurrentPage={(pageNumber) => setCurrentPageNumber(pageNumber)}
      />
    ) : null
  }

  const getSortOptions = (tabValue: number) => {
    if (tabValue === 2) {
      return blockSortOptions
    }
    return sortOptions
  }

  return (
    <div>
      <div style={Styled.HeaderWrapper}>
        <Tabs
          value={value}
          onChange={(_event, newValue) => setValue(newValue)}
          aria-label='Toggle between categorized filter results'
          sx={Styled.Tabs}
        >
          <Tab
            label={
              <TabLabel
                type='COURSE'
                numberOfResults={courseResults.meta.pagination.total}
              />
            }
            disableRipple
            sx={Styled.Tab}
          />
          <Tab
            label={
              <TabLabel
                type='LECTURE'
                numberOfResults={lectureResults.meta.pagination.total}
              />
            }
            disableRipple
            sx={Styled.Tab}
          />
          <Tab
            label={
              <TabLabel
                type='BLOCK'
                numberOfResults={blockResults.meta.pagination.total}
              />
            }
            disableRipple
            sx={Styled.Tab}
          />
        </Tabs>
        <DropdownSingleSelectable
          selectedItem={sortMethod}
          setSelectedItem={(newSortmethod) =>
            setSortMethod(newSortmethod as SortOption)
          }
          label='Sort'
          placeholder={sortMethod.label}
          ariaLabel='Sort options to pick from'
          enableSearch={false}
          getItems={() => Promise.resolve(Object.values(getSortOptions(value)))}
        />
      </div>
      <TabPanel value={value} index={0}>
        <CardList
          cards={courseResults.data.map((result) =>
            courseDataToCardFormat(result)
          )}
        />
        {getPaginationController(
          courseResults.meta,
          currentCoursePageNumber,
          setCurrentCoursePageNumber
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardList
          cards={lectureResults.data.map((result) =>
            lectureDataToCardFormat(result)
          )}
        />
        {getPaginationController(
          lectureResults.meta,
          currentLecturePageNumber,
          setCurrentLecturePageNumber
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CardList cards={blockDataToCardFormat(blockResults.data)} />
        {getPaginationController(
          blockResults.meta,
          currentBlockPageNumber,
          setCurrentBlockPageNumber
        )}
      </TabPanel>
    </div>
  )
}

export default TabGroup
