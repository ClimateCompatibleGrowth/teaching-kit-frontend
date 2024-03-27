import styled from '@emotion/styled'

// Start of design tokens - The following are Figma variables, which can be used in a design token manner
export const Background = '#FFFFFF'
export const Surface = '#F1F1F1'

export const Accent20 = '#011138'
export const OnAccent20 = '#FFFFFF'
export const Accent40 = '#012169'
export const Accent90 = '#6C99FE'
export const OnAccent40 = '#FFFFFF'

export const Neutral40 = '#757575'
export const OnNeutral40 = '#FFFFFF'

export const Neutral90 = '#CCCCCC'
export const OnNeutral90 = '#242424'

export const Neutral99 = '#F5F5F5'
export const OnNeutral99 = '#242424'

export const SurfaceAlternative = '#FFFFFF'
export const OnSurfaceAlternative = '#242424'

export const Primary40 = '#CBD3EA'
export const OnPrimary40 = '#2E3440'

export const Primary90 = '#F0F3F9'
export const OnPrimary90 = '#2E3440'

export const Error20 = '#6F0800'
export const OnError20 = '#FFFFFF'

export const Error99 = '#FFDAD7'
export const OnError99 = '#242424'
// End of design tokens

export const AccentPinkLighter = '#F9F0F0'
export const AccentPink = '#EACCCC'
export const AccentPinkDarker = '#AD4848'
export const AccentGreen = '#D4EACC'
export const AccentGreenDarker = '#43742F'
export const AccentYellow = '#F3F5B4'
export const AccentYellowDarker = '#6E7113'

export const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '1024px',
  md_lg: '1217px',
  lg: '1440px',
} as const
export const mq = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  md_lg: `@media (min-width: ${breakpoints.md_lg})`,
} as const

export const customBreakPoint = 1217

export const BorderRadius = '0.5rem'

export const BlockContentWrapper = styled.div`
  flex: 0 0 100%;
  margin-top: 6rem;
  img {
    max-width: 100%;
  }

  ${mq.sm} {
    flex: 0 0 calc(75% - 4.6rem);
  }
`

export const PageContainer = styled.div<{
  hasBottomPadding?: boolean
  hasTopPadding?: boolean
  hasSmallSidePadding?: boolean
}>`
  padding: ${(props) => (props.hasTopPadding ? '4rem' : '0')} 1.6rem
    ${(props) => (props.hasBottomPadding ? '8rem' : '0')};

  ${mq.sm} {
    padding: ${(props) => (props.hasTopPadding ? '8rem' : '0')} 2rem
      ${(props) => (props.hasBottomPadding ? '8rem' : '0')};
    margin: 0 auto;
  }

  ${mq.md} {
    padding: ${(props) => (props.hasTopPadding ? '8rem' : '0')} 8rem
      ${(props) => (props.hasBottomPadding ? '14rem' : '0')};
    max-width: ${breakpoints.lg};
    margin: 0 auto;
  }

  ${mq.lg} {
    padding: ${(props) => (props.hasTopPadding ? '8rem' : '0')}
      ${(props) => (props.hasSmallSidePadding ? '8rem' : '4rem')}
      ${(props) => (props.hasBottomPadding ? '14rem' : '0')};
  }
`

export const VisuallyHidden = styled.div`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const OlWithoutDefaultStyle = styled.ol`
  padding: 0;
  margin: 0;
  list-style-type: none;

  a {
    &:hover {
      color: darkblue;
    }
  }
`

export const UlWithoutDefaultStyle = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;

  a {
    &:hover {
      color: darkblue;
    }
  }
`

export const ButtonWithoutDefaultStyle = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0px;
  font: inherit;
  cursor: pointer;
`

export const LearningMaterialOverview = styled.div`
  p {
    max-width: 729px;
  }
  flex-direction: column;
  flex-wrap: nowrap;
  column-gap: 4.6rem;
  ${mq.md_lg} {
  }

  h1 {
    max-width: 729px;
  }
`

export const LearningMaterialCourseHeading = styled.h2`
  font-size: 2rem;

  ${mq.sm} {
    font-size: 2.4rem;
  }
`

export const LearningMaterialList = styled.ul`
  padding: unset;
  list-style: none;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  display: grid;
`

export const LearningMaterialListItem = styled.li`
  a {
    display: block;
    background-color: brown;
    border-radius: 10px;
    transition: 0.3s;
    padding: 12px;
    height: 200px;
    overflow: hidden;

    &:hover {
      transform: scale(1.03);
    }
  }
`

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8rem;

  ${mq.sm} {
    margin: 0 8rem;
  }
`
