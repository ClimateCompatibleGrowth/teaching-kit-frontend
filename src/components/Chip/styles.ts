import styled from '@emotion/styled'
import {
  Accent40,
  ButtonWithoutDefaultStyle,
  OnAccent40,
} from '../../styles/global'

export const Chip = styled.div`
  height: 3.2rem;

  padding: 0px 1.4rem;

  display: flex;
  align-items: center;

  background-color: ${Accent40};
  color: ${OnAccent40};
`

export const RemoveButton = styled(ButtonWithoutDefaultStyle)`
  height: inherit;

  margin-left: 1rem;
`
