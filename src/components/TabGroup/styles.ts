import {
  Accent40,
  Neutral40,
  Neutral99,
  OnAccent40,
  OnNeutral99,
  OnPrimary90,
  OnSurfaceAlternative,
  Primary90,
  SurfaceAlternative,
} from '../../styles/global'

export const TabsWrapper = {
  borderBottom: `1px solid ${Neutral40}`,
}

export const Tabs = {
  '.MuiTabs-indicator': {
    display: 'none',
  },
}

export const Tab = {
  margin: 0,

  display: 'flex',
  flexDirection: 'row',

  backgroundColor: Primary90,
  color: OnPrimary90,

  gap: '1rem',

  textTransform: 'initial',
  borderRadius: '0.7rem 0.7rem 0 0',

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
