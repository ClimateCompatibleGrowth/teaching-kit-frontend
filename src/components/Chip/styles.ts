import styled from '@emotion/styled'
import {
  Accent40,
  ButtonWithoutDefaultStyle,
  OnAccent40,
} from '../../styles/global'

export const Chip = styled.div`
  padding: 0px 0.4rem 0 1.4rem;

  display: flex;
  align-items: center;

  background-color: ${Accent40};
  color: ${OnAccent40};
`

export const RemoveButton = styled(ButtonWithoutDefaultStyle)`
  height: inherit;

  padding: 0.5rem 1rem;
`
