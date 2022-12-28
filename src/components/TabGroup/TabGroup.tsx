import React, { ReactNode, useCallback, useEffect, useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { filterCourseOnKeywordsAndAuthors } from '../../shared/requests/courses/courses'
import { filterLectureOnKeywordsAndAuthors } from '../../shared/requests/lectures/lectures'
import {
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
  const [currentCoursePageNumber, setCurrentCoursePageNumber] =
    useState(DEFAULT_PAGE_NUMBER)
  const [currentLecturePageNumber, setCurrentLecturePageNumber] =
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

  useEffect(() => {
    onCourseChange(currentCoursePageNumber)
  }, [currentCoursePageNumber, onCourseChange])

  useEffect(() => {
    onLectureChange(currentLecturePageNumber)
  }, [currentLecturePageNumber, onLectureChange])

  const getTabLabel = (type: LearningMaterialType): string => {
    switch (type) {
      case 'COURSE':
        return 'Courses'
      case 'LECTURE':
        return 'Lectures'
      case 'BLOCK':
        return 'Blocks'
    }
  }

  const getTabLabelComponent = (
    type: LearningMaterialType,
    numberOfResults: number
  ): ReactNode => {
    return (
      <>
        <h5>{getTabLabel(type)}</h5>
        <div className='NumberOfMatchesWrapper'>
          <h5 aria-label={`${numberOfResults} matching results`}>
            {numberOfResults}
          </h5>
        </div>
      </>
    )
  }

  const dataToCardFormat = (
    data: Data<CourseTwoLevelsDeep>[] | Data<LectureTwoLevelsDeep>[]
  ): CardType[] => {
    return data.map((result) => ({
      title: result.attributes.Title,
      id: result.id.toString(),
      text: result.attributes.Abstract,
      metaData: `Level: ${result.attributes.Level}`,
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
            label={getTabLabelComponent(
              'COURSE',
              courseResults.meta.pagination.total
            )}
            disableRipple
            sx={Styled.Tab}
          />
          <Tab
            label={getTabLabelComponent(
              'LECTURE',
              lectureResults.meta.pagination.total
            )}
            disableRipple
            sx={Styled.Tab}
          />
          <Tab label='Item Three' />
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
        Item Three
      </TabPanel>
    </div>
  )
}

export default TabGroup
