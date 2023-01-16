import styled from '@emotion/styled'
import { OnPrimary90, UlWithoutDefaultStyle } from '../../styles/global'

export const Metadata = styled(UlWithoutDefaultStyle)`
  margin-top: 2rem;
`

const MetadataInformation = styled.p`
  color: ${OnPrimary90}80;
`

export const Error = styled(MetadataInformation)`
  margin: 1.5rem 0 0 0;
`

export const Loader = styled.div`
  margin-top: 1.5rem;
`
