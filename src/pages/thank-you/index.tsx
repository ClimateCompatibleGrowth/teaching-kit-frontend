import Link from 'next/link'
import styled from '@emotion/styled'
import { Accent40, PageContainer } from '../../styles/global'
import { GetStaticPropsContext } from 'next'
import { ResponseArray } from '../../shared/requests/types'
import { Data, SubmissionConfirmationPageCopy } from '../../types'
import axios from 'axios'
import Markdown from '../../components/Markdown/Markdown'

const Wrapper = styled.main`
  min-height: 60vh;
`

const NextLink = styled(Link)`
  color: ${Accent40};
  text-decoration: underline;
`

const Styled = { NextLink, Wrapper }

type ThankYouProps = {
  pageCopy: Data<SubmissionConfirmationPageCopy>
}

export default function ThankYou({ pageCopy }: ThankYouProps) {
  return (
    <Styled.Wrapper>
      <PageContainer hasTopPadding hasBottomPadding>
        <h1>{pageCopy.attributes.Title}</h1>
        <Markdown>{pageCopy.attributes.Body}</Markdown>
      </PageContainer>
    </Styled.Wrapper>
  )
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  try {
    const pageCopyRequest: Promise<ResponseArray<SubmissionConfirmationPageCopy>> = axios.get(
      `${process.env.STRAPI_API_URL}/copy-submission-confirmation-pages?locale=${ctx.locale ?? ctx.defaultLocale
      }`
    )

    const [pageCopy] = await Promise.all([
      pageCopyRequest,
    ])

    console.log(pageCopy);


    if (!pageCopy || pageCopy.data.data.length < 1) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        pageCopy: pageCopy.data.data[0],
      },
    }
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    }
  }
}