import styled from '@emotion/styled'
import { Error20, Error99 } from '../../styles/global'

const iconWidth = '3rem'

export const Wrapper = styled.div`
  padding: 1.6rem;

  background-color: ${Error99};
  border-radius: 0.4rem;
  border: 1px solid ${Error20};
`

export const HeaderWrapper = styled.div`
  display: flex;
`

export const Icon = styled.div`
  width: ${iconWidth};

  display: flex;
  align-items: center;
`

export const Title = styled.h4`
  margin: 0;

  font-size: 1.6rem;
`

export const Text = styled.p`
  font-size: 1.4rem;

  margin: 1rem 0 0 ${iconWidth};
`
