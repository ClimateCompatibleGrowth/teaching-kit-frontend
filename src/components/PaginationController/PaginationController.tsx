import React from 'react'
import * as Styled from './styles'

import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'

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
  return (
    <Styled.PaginationController>
      <Styled.PreviousButton
        onClick={() => setCurrentPage(currentPageNumber - 1)}
        isVisible={currentPageNumber !== 1}
        aria-label={`Go to previous page - page number ${
          currentPageNumber - 1
        }`}
      >
        <ExpandMoreOutlinedIcon />
      </Styled.PreviousButton>
      {[...Array(amountOfPages).keys()].map((index) => {
        const pageNumber = index + 1
        return (
          <Styled.PaginationPageButton key={index}>
            <Styled.Button
              isActive={pageNumber === currentPageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              aria-label={`Change page number to ${pageNumber}`}
            >
              {pageNumber}
            </Styled.Button>
          </Styled.PaginationPageButton>
        )
      })}
      <Styled.NextButton
        onClick={() => setCurrentPage(currentPageNumber + 1)}
        isVisible={currentPageNumber !== amountOfPages}
        aria-label={`Go to next page - page number ${currentPageNumber + 1}`}
      >
        <ExpandMoreOutlinedIcon />
      </Styled.NextButton>
    </Styled.PaginationController>
  )
}

export default PaginationController
