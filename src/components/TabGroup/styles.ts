import styled from '@emotion/styled'
import {
  Accent20,
  Accent40,
  Accent90,
  mq,
  Neutral40,
  OnAccent40,
  OnPrimary90,
  Primary90,
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
      marginLeft: '4px',
    },
  },

  '&.MuiTab-root': {
    padding: '10px 14px',
    minWidth: '100%',
    flex: '0 0 100%',

    [`${mq.sm}`]: {
      minWidth: 'auto',
      flex: 'initial',
    },
    [`&:active`]: {
      backgroundColor: Accent20,
    },
    [`&:hover`]: {
      backgroundColor: Accent90,
    },
  },

  '&.Mui-selected': {
    color: OnAccent40,
    backgroundColor: Accent40,
  },
}

export const LinkWrapper = styled.p`
  a {
    color: ${Accent40};
    text-decoration: underline;
  }
`
