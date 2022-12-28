import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { filterCourseOnKeywordsAndAuthors } from '../../shared/requests/courses/courses'
import { filterLectureOnKeywordsAndAuthors } from '../../shared/requests/lectures/lectures'
import {
  BlockOneLevelDeep,
  CourseTwoLevelsDeep,
  Data,
  LearningMaterialType,
  LectureTwoLevelsDeep,
} from '../../types'
import { MetaData, ResponseArrayData } from '../../shared/requests/types'
import CardList from '../CardList/CardList'
import PaginationController from '../PaginationController/PaginationController'
import { CardType } from '../CardList/Card/Card'
import TabPanel from './TabPanel/TabPanel'

import * as Styled from './styles'
import { filterBlockOnKeywordsAndAuthors } from '../../shared/requests/blocks/blocks'
import TabLabel from './TabLabel/TabLabel'

type Props = {
  selectedKeywords: string[]
  selectedAuthors: string[]
}

const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_MATCHES_PER_PAGE = 4

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

const TabGroup = ({ selectedKeywords, selectedAuthors }: Props) => {
  const [value, setValue] = React.useState(0)
  const [courseResults, setCourseResults] =
    useState<ResponseArrayData<CourseTwoLevelsDeep>>(defaultFilterResult)
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

  const onCourseChange = useCallback(
    async (pageNumber: number) => {
      const courseFilterResult = await filterCourseOnKeywordsAndAuthors({
        keywords: selectedKeywords,
        authors: selectedAuthors,
        pageNumber: pageNumber,
        matchesPerPage,
      })

      setCourseResults(courseFilterResult)
    },
    [selectedKeywords, selectedAuthors, matchesPerPage]
  )

  const onLectureChange = useCallback(
    async (pageNumber: number) => {
      const lectureFilterResult = await filterLectureOnKeywordsAndAuthors({
        keywords: selectedKeywords,
        authors: selectedAuthors,
        pageNumber: pageNumber,
        matchesPerPage,
      })

      setLectureResults(lectureFilterResult)
    },
    [selectedKeywords, selectedAuthors, matchesPerPage]
  )

  const onBlockChange = useCallback(
    async (pageNumber: number) => {
      const blockFilterResult = await filterBlockOnKeywordsAndAuthors({
        keywords: selectedKeywords,
        authors: selectedAuthors,
        pageNumber: pageNumber,
        matchesPerPage,
      })

      setBlockResults(blockFilterResult)
    },
    [selectedKeywords, selectedAuthors, matchesPerPage]
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

  const dataToCardFormat = (
    data:
      | Data<CourseTwoLevelsDeep>[]
      | Data<LectureTwoLevelsDeep>[]
      | Data<BlockOneLevelDeep>[]
  ): CardType[] => {
    return data.map((result) => ({
      title: result.attributes.Title,
      id: result.id.toString(),
      text: result.attributes.Abstract,
      metaData:
        'Level' in result.attributes
          ? `Level: ${result.attributes.Level}`
          : undefined,
    }))
  }

  const getPaginationController = (
    metaData: MetaData,
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

  return (
    <div>
      <div style={Styled.TabsWrapper}>
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
      </div>
      <TabPanel value={value} index={0}>
        <CardList cards={dataToCardFormat(courseResults.data)} />
        {getPaginationController(
          courseResults.meta,
          currentCoursePageNumber,
          setCurrentCoursePageNumber
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardList cards={dataToCardFormat(lectureResults.data)} />
        {getPaginationController(
          lectureResults.meta,
          currentLecturePageNumber,
          setCurrentLecturePageNumber
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CardList cards={dataToCardFormat(blockResults.data)} />
        {getPaginationController(
          lectureResults.meta,
          currentBlockPageNumber,
          setCurrentBlockPageNumber
        )}
      </TabPanel>
    </div>
  )
}

export default TabGroup
