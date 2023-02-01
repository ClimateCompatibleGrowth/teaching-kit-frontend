import React from 'react'
import ReactMarkdown from 'react-markdown'
import { RecentUpdateType } from '../../../shared/requests/recent/recent'
import { AccentBlue, AccentGreen, AccentYellow } from '../../../styles/global'
import Badge from '../../Badge/Badge'
import ClockIcon from '../../../../public/icons/clock.svg'
import SignalStrengthIcon from '../../../../public/icons/signal-strength.svg'
import * as Styled from './styles'

type Props = {
  recentUpdate: RecentUpdateType
}

const RecentUpdate = ({ recentUpdate }: Props) => {
  let typeColor = 'none'
  let href = '/'
  let levelExplanation = 'Level is'
  switch (recentUpdate.Type) {
    case 'Course':
      typeColor = AccentBlue
      href = `/courses/${recentUpdate.Id}`
      break
    case 'Lecture':
      typeColor = AccentGreen
      href = `/lectures/${recentUpdate.Id}`
      break
    case 'Block':
      typeColor = AccentYellow
      href = `/blocks/${recentUpdate.Id}`
      break
    default:
      break
  }
  return (
    <Styled.Card href={href}>
      <Badge accentColor={typeColor}>{recentUpdate.Type}</Badge>
      <Styled.Title>{recentUpdate.Title}</Styled.Title>
      {recentUpdate.Abstract && (
        <Styled.Markdown>
          <ReactMarkdown allowedElements={['p']}>
            {recentUpdate.Abstract}
          </ReactMarkdown>
        </Styled.Markdown>
      )}
      <Styled.MetaWrapper>
        {recentUpdate.Level && (
          <Styled.MetaInformation>
            <>
              <SignalStrengthIcon aria-label={levelExplanation} />
              {recentUpdate.Level}
            </>
          </Styled.MetaInformation>
        )}
        {recentUpdate.Duration && (
          <Styled.MetaInformation>
            <ClockIcon aria-label='Duration is' />
            {recentUpdate.Duration}
          </Styled.MetaInformation>
        )}
      </Styled.MetaWrapper>
    </Styled.Card>
  )
}

export default RecentUpdate
