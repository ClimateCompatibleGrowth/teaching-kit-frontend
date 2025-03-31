import React from 'react'
import { RecentUpdateType } from '../../../shared/requests/recent/recent'
import Badge, { BadgeColor } from '../../Badge/Badge'
import * as Styled from './styles'
import { typeToText } from '../../../utils/utils'
import Markdown from '../../Markdown/Markdown'
import { useRouter } from 'next/router'
import { Locale } from '../../../types'
import TranslationDoesNotExist from '../../TranslationDoesNotExist/TranslationDoesNotExist'

type Props = {
  recentUpdate: RecentUpdateType
  translationDoesNotExistCopy: string | undefined
}

const RecentUpdate = ({ recentUpdate, translationDoesNotExistCopy }: Props) => {
  const { locale } = useRouter()
  let typeColor: BadgeColor = 'yellow'
  let href = '/'
  switch (recentUpdate.Type) {
    case 'LECTURE':
      typeColor = 'green'
      href = `/lectures/${recentUpdate.Vuid}`
      break
    case 'COURSE':
      typeColor = 'pink'
      href = `/courses/${recentUpdate.Vuid}`
      break
    default:
      break
  }

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
    </Styled.Card>
  )
}

export default RecentUpdate
