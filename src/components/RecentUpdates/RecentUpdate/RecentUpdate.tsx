import React from 'react'
import { RecentUpdateType } from '../../../shared/requests/recent/recent'
import Badge, { BadgeColor } from '../../Badge/Badge'
import ClockIcon from '../../../../public/icons/clock.svg'
import SignalStrengthIcon from '../../../../public/icons/signal-strength.svg'
import * as Styled from './styles'
import { typeToText, levelToString } from '../../../utils/utils'
import Markdown from '../../Markdown/Markdown'
import { useRouter } from 'next/router'
import { Locale } from '../../../types'
import TranslationDoesNotExist from '../../TranslationDoesNotExist/TranslationDoesNotExist'
import { LEVEL_ARIA_LABEL, translations } from './translations'

type Props = {
  recentUpdate: RecentUpdateType
  translationDoesNotExistCopy: string | undefined
}

const RecentUpdate = ({
  recentUpdate,
  translationDoesNotExistCopy: _translationDoesNotExistCopy,
}: Props) => {
  const { locale } = useRouter()
  let typeColor: BadgeColor = 'yellow'
  let href = '/'
  let levelExplanation =
    translations[locale as Locale].levelAriaLabel ?? LEVEL_ARIA_LABEL
  switch (recentUpdate.Type) {
    case 'LECTURE':
      typeColor = 'green'
      href = `/lectures/${recentUpdate.Vuid}`
      break
    case 'COURSE':
      typeColor = 'pink'
      href = `/courses/${recentUpdate.Vuid}`
      break
    case 'BLOCK':
      typeColor = 'yellow'
      href = `/blocks/${recentUpdate.Vuid}`
      break
    default:
      break
  }

  const translationDoesNotExistCopy =
    _translationDoesNotExistCopy ??
    'Translation missing. Showing the content in its original language.'

  return (
    <Styled.Card href={href}>
      {recentUpdate.Locale !== locale ? (
        <TranslationDoesNotExist copy={translationDoesNotExistCopy} />
      ) : null}
      <Badge accentColor={typeColor}>
        {typeToText(recentUpdate.Type, locale as Locale)}
      </Badge>
      <Styled.Title>{recentUpdate.Title}</Styled.Title>
      {recentUpdate.Abstract && (
        <Styled.Markdown>
          <Markdown allowedElements={['p']}>{recentUpdate.Abstract}</Markdown>
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
            <ClockIcon
              aria-label={translations[locale as Locale].durationAriaLabel}
            />
            {recentUpdate.Duration}
          </Styled.MetaInformation>
        )}
      </Styled.MetaWrapper>
    </Styled.Card>
  )
}

export default RecentUpdate
