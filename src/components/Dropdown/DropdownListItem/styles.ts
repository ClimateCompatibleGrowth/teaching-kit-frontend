import styled from "@emotion/styled";
import { ButtonWithoutDefaultStyle, Surface } from "../../../styles/global";

export const ListItem = styled.li`
  width: 100%;

  margin: 0;
`

export const ClickableListItem = styled(ButtonWithoutDefaultStyle)`
  width: 100%;

  display: flex;
  align-items: center;

  padding: 10px;

  text-align: left;
  border-radius: 3px;

  svg {
    margin-right: 0.8rem;
  }

  &:hover {
    background-color: ${Surface};
  }
`