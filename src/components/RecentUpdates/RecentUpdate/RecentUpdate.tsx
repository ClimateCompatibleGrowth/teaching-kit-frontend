import React from 'react'
import ReactMarkdown from 'react-markdown'
import { RecentUpdateType } from '../../../shared/requests/recent/recent'
import Badge, { BadgeColor } from '../../Badge/Badge'
import ClockIcon from '../../../../public/icons/clock.svg'
import SignalStrengthIcon from '../../../../public/icons/signal-strength.svg'
import * as Styled from './styles'
import { typeToText, levelToString } from '../../../utils/utils'

type Props = {
  recentUpdate: RecentUpdateType
}

const RecentUpdate = ({ recentUpdate }: Props) => {
  let typeColor: BadgeColor = 'yellow'
  let href = '/'
  let levelExplanation = 'Level is'
  switch (recentUpdate.Type) {
    case 'LECTURE':
      typeColor = 'green'
      href = `/lectures/${recentUpdate.Id}`
      break
    case 'COURSE':
      typeColor = 'pink'
      href = `/courses/${recentUpdate.Id}`
      break
    case 'BLOCK':
      typeColor = 'yellow'
      href = `/blocks/${recentUpdate.Id}`
      break
    default:
      break
  }

  return (
    <Styled.Card href={href}>
      <Badge accentColor={typeColor}>
        {typeToText(recentUpdate.Type)}
      </Badge>
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
              {levelToString(recentUpdate.Level)}
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
