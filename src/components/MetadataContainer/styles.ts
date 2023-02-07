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

  a {
    color: ${Accent40};
    text-decoration: underline;

    &:hover {
      color: ${Primary40};
    }
  }

  ${mq.sm} {
    flex: 0 1 26%;
  }
`

export const Heading = styled.h6`
  margin-bottom: 0.8rem;
`

export const Ul = styled(UlWithoutDefaultStyle)``

export const Li = styled.li`
  display: flex;
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
