import styled from '@emotion/styled'

// Start of design tokens - The following are Figma variables, which can be used in a design token manner
export const Background = '#FFFFFF'
export const Surface = '#F1F1F1'

export const Accent40 = '#012169'

export const Neutral40 = '#757575'

export const Neutral90 = '#CCCCCC'

export const Neutral99 = '#EBEBEB'

export const Primary40 = '#CBD3EA'
export const OnPrimary40 = '#2E3440'

export const Primary90 = '#F0F3F9'
export const OnPrimary90 = '#2E3440'
// End of design tokens

export const BorderRadius = '0rem 0rem 0rem 2.5rem'

export const UlWithoutDefaultStyle = styled.ul`
  padding: 0;
  margin: 0;

  list-style-type: none;
`

export const ButtonWithoutDefaultStyle = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`

export const LearningMaterialContainer = styled.div`
  padding: 0 20rem;
  display: flex;
`

export const LearningMaterialOverview = styled.div`
  width: 80%;
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
