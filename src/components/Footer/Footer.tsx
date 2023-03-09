import * as Styled from './styles'

import LogoIcon from '../../../public/logo.svg'
import VercelBanner from '../../../public/vercel-banner.svg'
import Markdown from '../Markdown/Markdown'

import Image from 'next/image'

export default function Footer() {
  return (
    <Styled.ColorBar>
      <Styled.Footer>
        <Styled.LogoWrapper>
          <Styled.LogoInnerWrapper>
            <LogoIcon alt='Climate Compatible Growth logotype' />
            <p>
              {`Copyright © Climate Compatible Growth ${new Date().getUTCFullYear()}. All rights reserved.`}
            </p>
            <Styled.VercelBanner>
              <VercelBanner alt='Powered on Vercel' width='67' height='22' />
            </Styled.VercelBanner>
          </Styled.LogoInnerWrapper>
        </Styled.LogoWrapper>
        <Styled.ContactWrapper>
          <Markdown>{footerContent}</Markdown>
          <br />
          <a href={'https://creativecommons.org/licenses/by/4.0/'}>
            <Image
              width={88}
              height={31}
              alt='Creative commons BY 4.0 license icon'
              src='https://licensebuttons.net/l/by/4.0/88x31.png'
            ></Image>
          </a>
        </Styled.ContactWrapper>
      </Styled.Footer>
    </Styled.ColorBar>
  )
}

const footerContent =
  '#### Contacts\n\nTo enquire about access to the teaching kit website to develop and share your own material, please e-mail [teaching@climatecompatiblegrowth.com](mailto:teaching@climatecompatiblegrowth.com)\n\nTo provide feedback on the teaching kit website, please e-mail [platform@climatecompatiblegrowth.com](mailto:platform@climatecompatiblegrowth.com)\n\n These teaching materials are based on content provided by Climate Compatible Growth as part of their FCDO-funded activities. As this content can be adapted by other institutions, the opinions expressed here may not reflect those of CCG or its funders.'
