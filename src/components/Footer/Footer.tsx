import * as Styled from './styles'

import LogoIcon from '../../../public/logo.svg'
import Markdown from '../Markdown/Markdown'

export default function Navbar() {
  return (
    <Styled.ColorBar>
      <Styled.Footer>
        <Styled.LogoWrapper>
          <LogoIcon alt='Climate Compatible Growth logotype' />
          <p>
            {`Copyright © Climate Compatible Growth ${new Date().getUTCFullYear()}. All rights reserved.`}
          </p>
        </Styled.LogoWrapper>
        <Styled.ContactWrapper>
          <Markdown>{footerContent}</Markdown>
        </Styled.ContactWrapper>
      </Styled.Footer>
    </Styled.ColorBar>
  )
}

const footerContent =
  '#### Contacts\n\nTo enquire about access to the teaching kit website to develop and share your own material, please e-mail [teaching@climatecompatiblegrowth.com](mailto:teaching@climatecompatiblegrowth.com)\n\nTo provide feedback on the teaching kit website, please e-mail [platform@climatecompatiblegrowth.com](mailto:platform@climatecompatiblegrowth.com)'
