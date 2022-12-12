import styled from "@emotion/styled"

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
  padding: 0 2rem;
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