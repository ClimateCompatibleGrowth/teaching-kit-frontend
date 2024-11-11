import React from 'react'
import styled from '@emotion/styled'
import Markdown from '../../components/Markdown/Markdown'
import { Accent40, breakpoints, PageContainer } from '../../styles/global'

const Wrapper = styled.div`
  max-width: ${breakpoints.md};
  margin: 0 auto;
  padding: 0 1.6rem;
  justify-content: space-between;
  font-size: 1.7rem;

  a {
    color: ${Accent40};
    text-decoration: underline;
  }
`

const markdown = `# Terms and Conditions
They apply to the website (https://curriculum.climatecompatiblegrowth.com/) you were using which linked to these Conditions of Use (the “Site”).

The Climate Compatible Curriculum website (‘the site’) publishes courses containing material provided by third parties. All copyrights, trademarks, design rights, patents, and other intellectual property rights (whether registered or unregistered) shall remain the property of the respective third-party owners. All material on this website is licensed under CC-BY 4.0 Attribution license. CCG grants you the right to make use of the materials as they are or in modified form under the terms of the CC-BY 4.0 Attribution License. You may translate, modify, print, network, reformat or change the materials in any way providing that you meet these terms of the use. Course creators who upload material to the site retain ownership of their course and are responsible for the content and copyright clearances - this means checking the copyright restrictions of any content they include in their course and publishing acknowledgements and clear information on how to cite the course. Currently, all the courses and resources shared on CCG the site have a clear ‘How to cite’ section.  You must attribute materials shared by third party users on CCG the site using the guidance provided about citing content for attribution when reusing content you found on the site for your purposes.`

export default function TermsAndConditions() {
  return <PageContainer hasTopPadding hasBottomPadding>
    <Wrapper>
      <Markdown>
        {markdown}
      </Markdown>
    </Wrapper>
  </PageContainer>
}