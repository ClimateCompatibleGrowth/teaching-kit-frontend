import * as Styled from './styles'

import LogoIcon from '../../../public/logo.svg'
import Markdown from '../Markdown/Markdown'
import Image from 'next/image'

export default function Navbar() {
  return (
    <Styled.ColorBar>
      <Styled.Footer>
        <Styled.LogoWrapper>
          <Styled.LogoInnerWrapper>
            <LogoIcon alt='Climate Compatible Growth logotype' />
            <p>
              {`Copyright © Climate Compatible Growth ${new Date().getUTCFullYear()}. All rights reserved.`}
            </p>
          </Styled.LogoInnerWrapper>
        </Styled.LogoWrapper>
        <Styled.ContactWrapper>
          <Markdown>{footerContent}</Markdown>
          <br />
        </Styled.ContactWrapper>
      </Styled.Footer>
    </Styled.ColorBar>
  )
}

const footerContent =
  '#### Contacts\n\nTo enquire about access to the teaching kit website to develop and share your own material, please e-mail [teaching@climatecompatiblegrowth.com](mailto:teaching@climatecompatiblegrowth.com)\n\nTo provide feedback on the teaching kit website, please e-mail [platform@climatecompatiblegrowth.com](mailto:platform@climatecompatiblegrowth.com)\n\n These teaching materials are based on content provided by Climate Compatible Growth as part of their FCDO-funded activities. As this content can be adapted by other institutions, the opinions expressed here may not reflect those of CCG or its funders.\n\n [![http://creativecommons.org](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)'
