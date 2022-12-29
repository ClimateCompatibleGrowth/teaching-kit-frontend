import { montserrat } from '../../styles/fonts'
import { Accent40, Neutral90 } from '../../styles/global'

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
  fontSize: '1.6rem',
}
