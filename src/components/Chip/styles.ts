import styled from "styled-components";
import { ButtonWithoutDefaultStyle } from "../../styles/global";


export const StyledChip = styled.div`
  height: 2rem;

  padding: 5px 10px;

  display: flex;
  align-items: center;

  border-radius: 5px;
  background-color: darkgray;
`

export const RemoveButton = styled(ButtonWithoutDefaultStyle)`
  height: inherit;

  margin-left: 0.5rem;
`