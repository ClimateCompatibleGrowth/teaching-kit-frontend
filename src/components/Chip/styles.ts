import styled from "@emotion/styled";
import { ButtonWithoutDefaultStyle } from "../../styles/global";


export const Chip = styled.div`
  height: 4rem;

  padding: 0px 1.4rem;

  display: flex;
  align-items: center;

  border-radius: 5px;
  background-color: darkgray;
`

export const RemoveButton = styled(ButtonWithoutDefaultStyle)`
  height: inherit;

  margin-left: 1rem;
`