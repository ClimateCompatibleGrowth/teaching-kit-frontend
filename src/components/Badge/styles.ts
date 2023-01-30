import styled from '@emotion/styled'
import { OnNeutral99 } from '../../styles/global'

export const Badge = styled.span<{ accentColor: string }>`
  padding: 2px 8px;
  background-color: ${(props) => props.accentColor};
  color: ${OnNeutral99};
  border-radius: 100px;
  font-size: 1.6rem;
`
