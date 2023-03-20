import React, { Dispatch, SetStateAction, useState } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import {
  Block,
  BlockOneLevelDeep,
  CourseThreeLevelsDeep,
  Data,
  LectureOneLevelDeep,
  Locale,
} from '../../types'
import { Metadata, ResponseArrayData } from '../../shared/requests/types'
import CardList from '../CardList/CardList'
import PaginationController from '../PaginationController/PaginationController'
import { CardType } from '../CardList/Card/Card'
import TabPanel from './TabPanel/TabPanel'

import * as Styled from './styles'
import TabLabel from './TabLabel/TabLabel'
import { levelToString, summarizeDurations } from '../../utils/utils'
import LearningMaterialBadge from '../LearningMaterial/LearningMaterialBadge/LearningMaterialBadge'
import SignalStrengthIcon from '../../../public/icons/signal-strength.svg'
import ClockIcon from '../../../public/icons/clock.svg'
import Dropdown from '../Dropdown/Dropdown'
import {
  getBlockSortOptions,
  getSortOptions as getCourseAndLectureSortOptions,
  SortOption,
} from '../../types/filters'
import { ARIA_LABEL, LABEL, translations } from './translations'
import { useRouter } from 'next/router'

type Props = {
  controls: string
  selectedKeywords: string[]
  selectedAuthors: string[]
  selectedSort: SortOption
  setSelectedSort: (newSort: SortOption) => void
  courseResults: ResponseArrayData<CourseThreeLevelsDeep>
  lectureResults: ResponseArrayData<LectureOneLevelDeep>
  blockResults: ResponseArrayData<Block>
  currentCoursePageNumber: number
  setCurrentCoursePageNumber: Dispatch<SetStateAction<number>>
  currentLecturePageNumber: number
  setCurrentLecturePageNumber: Dispatch<SetStateAction<number>>
  currentBlockPageNumber: number
  setCurrentBlockPageNumber: Dispatch<SetStateAction<number>>
  translationDoesNotExistCopy: string
}

const TabGroup = ({
  controls,
  selectedSort,
  setSelectedSort,
  courseResults,
  lectureResults,
  blockResults,
  currentCoursePageNumber,
  setCurrentCoursePageNumber,
  currentLecturePageNumber,
  setCurrentLecturePageNumber,
  currentBlockPageNumber,
  setCurrentBlockPageNumber,
  translationDoesNotExistCopy,
}: Props) => {
  const { locale: _locale } = useRouter()
  const locale = _locale as Locale
  const [tabIndex, setTabIndex] = React.useState(0)
  const translation = translations[locale]

  const blockDataToCardFormat = (data: Data<Block>[]): CardType[] => {
    return data.map((block) => ({
      title: block.attributes.Title,
      id: block.id.toString(),
      text: block.attributes.Abstract,
      href: `/blocks/${block.attributes.vuid}`,
      subTitle: <LearningMaterialBadge type='BLOCK' />,
      duration: (
        <>
          <ClockIcon style={{ marginRight: 8 }} />
          {summarizeDurations([block], locale)}
        </>
      ),
      locale: block.attributes.locale,
      translationDoesNotExistCopy,
    }))
  }

  const lectureDataToCardFormat = (
    data: Data<LectureOneLevelDeep>
  ): CardType => {
    const baseCard = dataToCardFormat(data)
    return {
      ...baseCard,
      href: `/lectures/${data.attributes.vuid}`,
      subTitle: <LearningMaterialBadge type='LECTURE' />,
      duration: (
        <>
          <ClockIcon style={{ marginRight: 8 }} />
          {summarizeDurations(data.attributes.Blocks.data, locale)}
        </>
      ),
    }
  }

  const courseDataToCardFormat = (
    data: Data<CourseThreeLevelsDeep>
  ): CardType => {
    const baseCard = dataToCardFormat(data)
    return {
      ...baseCard,
      href: `/courses/${data.attributes.vuid}`,
      subTitle: <LearningMaterialBadge type='COURSE' />,
      duration: (
        <>
          <ClockIcon style={{ marginRight: 8 }} />
          {summarizeDurations(
            data.attributes.Lectures.data.reduce(
              (blocks, lecture) => [
                ...blocks,
                ...lecture.attributes.Blocks.data,
              ],
              [] as Data<Pick<BlockOneLevelDeep, 'DurationInMinutes'>>[]
            ),
            locale
          )}
        </>
      ),
      locale: data.attributes.locale,
      translationDoesNotExistCopy,
    }
  }

  const dataToCardFormat = (
    learningMaterial: Data<LectureOneLevelDeep> | Data<CourseThreeLevelsDeep>
  ): CardType => {
    const level = levelToString(learningMaterial.attributes.Level)
    return {
      title: learningMaterial.attributes.Title,
      id: learningMaterial.id.toString(),
      text: learningMaterial.attributes.Abstract,
      level: level && (
        <React.Fragment>
          <SignalStrengthIcon style={{ marginRight: 8 }} />
          {level}
        </React.Fragment>
      ),
      locale: learningMaterial.attributes.locale,
      translationDoesNotExistCopy,
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

  const getSortOptions = (tabValue: number, locale: Locale) => {
    if (tabValue === 2) {
      return getBlockSortOptions(locale)
    }
    return getCourseAndLectureSortOptions(locale)
  }

  return (
    <div>
      <div style={Styled.HeaderWrapper}>
        <Tabs
          value={tabIndex}
          onChange={(_event, newIndex) => setTabIndex(newIndex)}
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
        <Dropdown
          controls={controls}
          id='sort-options'
          isSingleSelectable
          selectedItems={[selectedSort]}
          setSelectedItems={(newSelectedSort) => {
            setSelectedSort(newSelectedSort[0] as SortOption)
          }}
          label={translation.label ?? LABEL}
          placeholder={selectedSort.label}
          ariaLabel={translation.ariaLabel ?? ARIA_LABEL}
          enableSearch={false}
          getItems={() =>
            Promise.resolve(Object.values(getSortOptions(tabIndex, locale)))
          }
        />
      </div>
      <div>
        <TabPanel value={tabIndex} index={0}>
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
        <TabPanel value={tabIndex} index={1}>
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
        <TabPanel value={tabIndex} index={2}>
          <CardList cards={blockDataToCardFormat(blockResults.data)} />
          {getPaginationController(
            blockResults.meta,
            currentBlockPageNumber,
            setCurrentBlockPageNumber
          )}
        </TabPanel>
      </div>
    </div>
  )
}

export default TabGroup
