import Link from 'next/link'
import styled from '@emotion/styled'
import { Accent40, PageContainer } from '../../styles/global'

const Wrapper = styled.main`
  min-height: 60vh;
`

const NextLink = styled(Link)`
  color: ${Accent40};
  text-decoration: underline;
`

const Styled = { NextLink, Wrapper }

export default function ThankYou() {
  return (
    <Styled.Wrapper>
      <PageContainer hasTopPadding hasBottomPadding>
        <h1>Thank you</h1>
        <p>
          Your teaching material has successfully been submitted to us, a confirmation email should be sent within a few minutes. We will need a few days to review your submission before it is published, and will get back to you if there are any questions.
        </p>
      </PageContainer>
    </Styled.Wrapper>
  )
}
