import React, { useCallback, useEffect, useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { filterCourseOnKeywordsAndAuthors } from '../../shared/requests/courses/courses'
import { filterLectureOnKeywordsAndAuthors } from '../../shared/requests/lectures/lectures'
import {
  BlockOneLevelDeep,
  CourseThreeLevelsDeep,
  Data,
  LearningMaterialType,
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
import {
  getMatchingLecturesAndBlocksMatchingCourse,
  getMatchingLecturesAndBlocksMatchingLecture,
  Matches,
  TIMEOUT_THRESHOLD_FOR_MATCH_LOCALIZATION,
} from '../../utils/filterMatching/filterMatching'
import { typeToText } from '../../utils/utils'
import AsyncUnorderedList, {
  ListItem,
} from '../AsyncUnorderedList/AsyncUnorderedList'
import Link from 'next/link'

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

  const onCourseChange = useCallback(
    async (pageNumber: number) => {
      const courseFilterResult = await filterCourseOnKeywordsAndAuthors(
        selectedKeywords,
        selectedAuthors,
        pageNumber,
        matchesPerPage
      )

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

  const getLectureMatches = async (
    lecture: Data<LectureTwoLevelsDeep>,
    keywords: string[],
    authors: string[]
  ) => {
    const matches = await getMatchingLecturesAndBlocksMatchingLecture(
      lecture,
      keywords,
      authors
    )

    return Object.entries(matches).map(([filter, matchLocation]) => ({
      [filter]: matchLocation,
    }))
  }

  const getCourseMatches = async (
    course: Data<CourseThreeLevelsDeep>,
    keywords: string[],
    authors: string[]
  ) => {
    const matches = await getMatchingLecturesAndBlocksMatchingCourse(
      course,
      keywords,
      authors
    )

    return Object.entries(matches).map(([filter, matchLocation]) => ({
      [filter]: matchLocation,
    }))
  }

  const dataToCardFormat = (
    data: Data<LectureTwoLevelsDeep>[] | Data<BlockOneLevelDeep>[]
  ): CardType[] => {
    return data.map((result) => ({
      title: result.attributes.Title,
      id: result.id.toString(),
      text: result.attributes.Abstract,
    }))
  }

  const learningMaterialToCardFormat = (
    learningMaterial: Data<LectureTwoLevelsDeep> | Data<CourseThreeLevelsDeep>,
    learningMaterialType: LearningMaterialType,
    getMatches: () => Promise<Matches[]>
  ): CardType => {
    const typeAsText = typeToText(learningMaterialType).toLowerCase()
    return {
      title: learningMaterial.attributes.Title,
      id: learningMaterial.id.toString(),
      text: learningMaterial.attributes.Abstract,
      metadata: `${
        learningMaterial.attributes.Level !== undefined
          ? `Level: ${learningMaterial.attributes.Level}`
          : undefined
      }`,
      subComponent: (
        <AsyncUnorderedList
          getListItems={getMatches}
          renderListItem={(listItem) =>
            renderFilterLocalization(listItem, learningMaterialType)
          }
          loadingText={`Localizing where in the ${typeAsText} the match was made...`}
          errorLogText={`Localization of filter matches for ${typeAsText} with title '${learningMaterial.attributes.Title}' timed out after ${TIMEOUT_THRESHOLD_FOR_MATCH_LOCALIZATION} ms.'`}
          userFacingErrorText={`Unable to localize where in the ${typeAsText} the filter matched...`}
        />
      ),
    }
  }

  const lectureDataToCardFormat = (
    data: Data<LectureTwoLevelsDeep>[],
    learningMaterialType: LearningMaterialType
  ): CardType[] => {
    return data.map((result) =>
      learningMaterialToCardFormat(result, learningMaterialType, () =>
        getLectureMatches(result, selectedKeywords, selectedAuthors)
      )
    )
  }

  const courseDataToCardFormat = (
    data: Data<CourseThreeLevelsDeep>[],
    learningMaterialType: LearningMaterialType
  ): CardType[] => {
    return data.map((result) =>
      learningMaterialToCardFormat(result, learningMaterialType, () =>
        getCourseMatches(result, selectedKeywords, selectedAuthors)
      )
    )
  }

  const renderFilterLocalization = (
    matchingFilter: ListItem,
    learningMaterialType: LearningMaterialType
  ) => {
    const match = matchingFilter as Matches
    const [filter, matchLocation] = Object.entries(match)[0]
    if (matchLocation.block !== undefined) {
      return (
        <Styled.LinkWrapper>
          {`"${filter}" found in the lecture block `}
          <Link href={matchLocation.block.href}>
            {matchLocation.block.title}
          </Link>
          {learningMaterialType === 'COURSE' ? (
            <>
              {', which is part of the lecture '}
              <Link href={matchLocation.lecture.href}>
                {matchLocation.lecture.title}
              </Link>{' '}
            </>
          ) : null}
        </Styled.LinkWrapper>
      )
    }
    return (
      <Styled.LinkWrapper>
        {`"${filter}" found in the lecture `}
        <Link href={matchLocation.lecture.href}>
          {matchLocation.lecture.title}
        </Link>
      </Styled.LinkWrapper>
    )
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
        <CardList
          cards={courseDataToCardFormat(courseResults.data, 'COURSE')}
        />
        {getPaginationController(
          courseResults.meta,
          currentCoursePageNumber,
          setCurrentCoursePageNumber
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardList
          cards={lectureDataToCardFormat(lectureResults.data, 'LECTURE')}
        />
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
