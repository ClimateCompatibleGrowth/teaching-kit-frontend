import Link from 'next/link'
import styled from '@emotion/styled'
import { Accent40, PageContainer } from '../styles/global'

const Wrapper = styled.main`
  min-height: 60vh;
`

const NextLink = styled(Link)`
  color: ${Accent40};
  text-decoration: underline;
`

const Styled = { NextLink, Wrapper }

export default function Home() {
  return (
    <Styled.Wrapper>
      <PageContainer hasTopPadding hasBottomPadding>
        <h1>Something went wrong</h1>
        <p>
          There doesn&apos;t seem to be any content on this page. You can go
          back to the <NextLink href='/'>start page</NextLink>
        </p>
      </PageContainer>
    </Styled.Wrapper>
  )
}
