import React, { Dispatch, SetStateAction } from 'react'

import {
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
import LearningMaterialBadge from '../LearningMaterial/LearningMaterialBadge/LearningMaterialBadge'
import Dropdown from '../Dropdown/Dropdown'
import {
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
  currentCoursePageNumber: number
  setCurrentCoursePageNumber: Dispatch<SetStateAction<number>>
  translationDoesNotExistCopy: string
}

const TabGroup = ({
  controls,
  selectedSort,
  setSelectedSort,
  courseResults,
  currentCoursePageNumber,
  setCurrentCoursePageNumber,
  translationDoesNotExistCopy,
}: Props) => {
  const { locale: _locale } = useRouter()
  const locale = _locale as Locale
  const [tabIndex, setTabIndex] = React.useState(0)
  const translation = translations[locale]

  const courseDataToCardFormat = (
    data: Data<CourseThreeLevelsDeep>
  ): CardType => {
    const baseCard = dataToCardFormat(data)
    return {
      ...baseCard,
      href: `/courses/${data.attributes.vuid}`,
      subTitle: <LearningMaterialBadge type='COURSE' />,
      locale: data.attributes.locale,
      translationDoesNotExistCopy,
    }
  }

  const dataToCardFormat = (
    learningMaterial: Data<LectureOneLevelDeep> | Data<CourseThreeLevelsDeep>
  ): CardType => {
    return {
      title: learningMaterial.attributes.Title,
      id: learningMaterial.id.toString(),
      text: learningMaterial.attributes.Abstract,
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

  const getSortOptions = () => {
    return getCourseAndLectureSortOptions()
  }

  return (
    <div>
      <div style={Styled.HeaderWrapper}>
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
            Promise.resolve(Object.values(getSortOptions()))
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
      </div>
    </div>
  )
}

export default TabGroup
