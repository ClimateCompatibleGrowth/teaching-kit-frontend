import styled from '@emotion/styled'
import { montserrat } from '../../styles/fonts'
import { Accent40, Neutral90 } from '../../styles/global'

export const Wrapper = styled.div`
  margin: 3rem 0;
`

export const Accordion = {
  borderBottom: `1px solid ${Neutral90}`,

  '&:before': {
    display: 'none',
  },

  'p, ul': {
    marginTop: 0,
  },
}

export const Summary = {
  color: Accent40,
  fontFamily: montserrat['400'].style.fontFamily,
  fontSize: '1.8rem',
}
