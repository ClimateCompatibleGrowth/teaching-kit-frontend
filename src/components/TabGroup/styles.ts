import styled from '@emotion/styled'
import { montserrat } from '../../styles/fonts'
import {
  Accent40,
  mq,
  Neutral40,
  Neutral99,
  OnAccent40,
  OnNeutral99,
  OnPrimary90,
  OnSurfaceAlternative,
  Primary90,
  SurfaceAlternative,
} from '../../styles/global'

export const HeaderWrapper = {
  display: 'flex',
  flexWrap: 'wrap' as 'wrap',
  justifyContent: 'space-between',
  alignItems: 'end',

  borderBottom: `1px solid ${Neutral40}`,
  paddingBottom: '0.8rem',

  [`${mq.sm}`]: {
    paddingBottom: 0,
  },
}

export const Tabs = {
  width: '100%',

  [`${mq.sm}`]: {
    width: 'auto',
  },
  '.MuiTabs-flexContainer': {
    flexWrap: 'wrap',
    rowGap: '0.8rem',
    marginBottom: '0.8rem',

    [`${mq.sm}`]: {
      marginBottom: 0,
    },
  },
  '.MuiTabs-indicator': {
    display: 'none',
  },
}

export const Tab = {
  margin: 0,
  flex: '0 0 100%',

  display: 'flex',
  flexDirection: 'row',

  backgroundColor: Primary90,
  color: OnPrimary90,

  gap: '1rem',

  textTransform: 'initial',
  [`${mq.sm}`]: {
    flex: 'auto',
  },

  '& + &': {
    [`${mq.sm}`]: {
      'margin-left': '4px',
    },
  },

  '&.MuiTab-root': {
    padding: '10px 14px',
    minWidth: '100%',
    flex: '0 0 100%',
    fontWeight: 400, // TODO FIX FONT BOLDNESS
    fontFamily: `${montserrat[400].style.fontFamily}`,

    [`${mq.sm}`]: {
      minWidth: 'auto',
      flex: 'initial',
    },
  },

  '&.Mui-selected': {
    color: OnAccent40,
    backgroundColor: Accent40,

    '.NumberOfMatchesWrapper': {
      backgroundColor: Neutral99,
      color: OnNeutral99,
    },
  },

  '.NumberOfMatchesWrapper': {
    padding: '0.4rem 1rem',

    backgroundColor: SurfaceAlternative,

    borderRadius: '1.5rem',
  },
}

export const NumberOfMatchesWrapper = {
  padding: '0.4rem 1rem',

  backgroundColor: SurfaceAlternative,
  color: OnSurfaceAlternative,

  borderRadius: '1.5rem',
}

export const LinkWrapper = styled.p`
  a {
    color: ${Accent40};
    text-decoration: underline;
  }
`
