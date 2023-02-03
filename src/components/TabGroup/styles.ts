import styled from '@emotion/styled'
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
}

export const Tabs = {
  width: '100%',

  [`${mq.sm}`]: {
    width: 'auto',
  },
  '.MuiTabs-flexContainer': {
    flexWrap: 'wrap',
    rowGap: '0.8rem',
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
    borderRadius: '0.7rem 0.7rem 0 0',
  },

  '&.MuiTab-root': {
    minWidth: '100%',
    flex: '0 0 100%',

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
