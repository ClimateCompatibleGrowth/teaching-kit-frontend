import React, { useEffect } from 'react'
import * as Styled from './styles'

import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import { Accent40 } from '../../styles/global'

type Props = {
  amountOfPages: number
  currentPageNumber: number
  setCurrentPage: (pageNumber: number) => void
}

const PaginationController = ({
  amountOfPages,
  currentPageNumber,
  setCurrentPage,
}: Props) => {
  const pages = [...Array(amountOfPages).keys()]
  useEffect(() => {
    const currentPageElementInList = document.getElementById(
      `page-number-list-item-${currentPageNumber}`
    )
    if (typeof window !== 'undefined' && currentPageElementInList) {
      currentPageElementInList.scrollIntoView({ inline: 'center' })
    }
  }, [currentPageNumber])

  return (
    <Styled.PaginationWrapper>
      <Styled.PreviousButton
        onClick={() => setCurrentPage(currentPageNumber - 1)}
        isVisible={currentPageNumber !== 1}
        aria-label={`Go to previous page - page number ${
          currentPageNumber - 1
        }`}
      >
        <ExpandLessOutlinedIcon
          style={{ height: 28, width: 28, color: Accent40 }}
        />
      </Styled.PreviousButton>
      <Styled.PaginationController>
        {pages.map((index) => {
          const pageNumber = index + 1
          return (
            <Styled.PaginationPageButton key={index}>
              <Styled.Button
                id={`page-number-list-item-${pageNumber}`}
                disabled={pageNumber === currentPageNumber}
                isActive={pageNumber === currentPageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                aria-label={`Change page number to ${pageNumber}`}
              >
                {pageNumber}
              </Styled.Button>
            </Styled.PaginationPageButton>
          )
        })}
      </Styled.PaginationController>
      <Styled.NextButton
        onClick={() => setCurrentPage(currentPageNumber + 1)}
        isVisible={currentPageNumber !== amountOfPages}
        aria-label={`Go to next page - page number ${currentPageNumber + 1}`}
      >
        <ExpandLessOutlinedIcon
          style={{ height: 28, width: 28, color: Accent40 }}
        />
      </Styled.NextButton>
    </Styled.PaginationWrapper>
  )
}

export default PaginationController
