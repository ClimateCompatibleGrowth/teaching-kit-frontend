import styled from '@emotion/styled'
import {
  ButtonWithoutDefaultStyle,
  Neutral99,
  Surface,
} from '../../../styles/global'

export const ListItem = styled.li<{ isFocused?: boolean }>`
  width: 100%;

  margin: 0;
  background-color: ${(props) => (props.isFocused ? Neutral99 : undefined)};
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
