import styled from '@emotion/styled'
import {
  Accent40,
  BorderRadius,
  mq,
  Neutral99,
  Primary40,
  UlWithoutDefaultStyle,
} from '../../styles/global'
import Clock from '../../../public/icons/clock.svg'
import Email from '../../../public/icons/email.svg'
import SignalStrength from '../../../public/icons/signal-strength.svg'
import Download from '../../../public/icons/download.svg'

export const MetadataContainer = styled.div`
  flex: 0 1 100%;
  padding: 3.2rem 2.6rem;
  background: ${Neutral99};
  overflow: auto;
  border-radius: ${BorderRadius};
  gap: 2rem;
  font-size: 1.6rem;
  margin-top: 6rem;

  ${mq.sm} {
    margin: 8rem auto;
  }

  ${mq.lg} {
    margin-top: 0;
    max-width: 40rem;
  }
`

export const Logo = styled.img`
  max-width: 50%;
  margin-bottom: 2rem;
`

export const Heading = styled.h6`
  margin-bottom: 0.8rem;
`

export const Ul = styled(UlWithoutDefaultStyle)``

export const Li = styled.li`
a {
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.6rem;
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

export const DownloadButtonsContainer = styled.div`
  button + button {
    margin-top: 1.6rem;
  }
`

export const HeadingSet = styled.div`
  &:not(:last-child) {
    margin-bottom: 3.2rem;
  }
`

export const ShortInfo = styled.div`
  & + & {
    margin-top: 0.8rem;
  }
`

export const Alert = styled.div`
  margin-top: 2.5rem;
`

export const DownloadSize = styled.p`
  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`

export const ClockIcon = styled(Clock)`
  margin-right: 0.8rem;
  vertical-align: bottom;
`

export const SignalStrengthIcon = styled(SignalStrength)`
  margin-right: 0.8rem;
  vertical-align: bottom;
`

export const EmailIcon = styled(Email)`
  margin-right: 0.8rem;
  vertical-align: bottom;
`

export const DownloadIcon = styled(Download)`
  margin-right: 1rem;
`
