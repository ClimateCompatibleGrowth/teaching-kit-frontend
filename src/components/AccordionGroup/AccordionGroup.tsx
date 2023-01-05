import React, { ReactNode } from 'react'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import * as Styled from './styles'

type Props = {
  accordions: AccordionType[]
}

type AccordionType = {
  label: string
  content: ReactNode
}

const AccordionGroup = ({ accordions }: Props) => {
  return (
    <Styled.Wrapper>
      {accordions.map((accordion, index) => (
        <Accordion
          square
          disableGutters
          elevation={0}
          key={accordion.label}
          sx={Styled.Accordion}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <h5 style={Styled.Summary}>{accordion.label}</h5>
          </AccordionSummary>
          <AccordionDetails>{accordion.content}</AccordionDetails>
        </Accordion>
      ))}
    </Styled.Wrapper>
  )
}

export default AccordionGroup
