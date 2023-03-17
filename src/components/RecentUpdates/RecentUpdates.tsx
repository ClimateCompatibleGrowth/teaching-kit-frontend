import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRecentUpdates } from '../../hooks/useRecentUpdates'
import { PageContainer } from '../../styles/global'
import { Locale } from '../../types'
import Button from '../Button/Button'
import ButtonLink from '../ButtonLink/ButtonLink'
import RecentUpdate from './RecentUpdate/RecentUpdate'
import * as Styled from './styles'

type Props = {
  title: string
  loadMoreButtonLabel: string
  goToFilterPageButtonLabel: string
  translationDoesNotExistCopy: string | undefined
}

const RecentUpdates = ({
  title,
  loadMoreButtonLabel,
  goToFilterPageButtonLabel,
  translationDoesNotExistCopy,
}: Props) => {
  const { locale } = useRouter()

  const MAX_UPDATES_TO_SHOW = 30
  const UPDATE_INCREMENTS = 6
  const [updatesToShow, setUpdatesToShow] = useState(UPDATE_INCREMENTS)
  const { recentUpdates, isLoadingRecentUpdates, isRecentUpdatesError } =
    useRecentUpdates(locale as Locale)

  const addMoreUpdates = () => {
    setUpdatesToShow(updatesToShow + UPDATE_INCREMENTS)
  }

  const updatesToRender = recentUpdates?.slice(0, updatesToShow)

  return (
    <PageContainer hasBottomPadding hasSmallSidePadding>
      <Styled.CenterWrapper>
        <h2>{title}</h2>
      </Styled.CenterWrapper>
      {!isLoadingRecentUpdates && updatesToRender && (
        <Styled.RecentList>
          {updatesToRender.map((recentUpdate) => (
            <RecentUpdate
              recentUpdate={recentUpdate}
              key={`${recentUpdate.Type}-${recentUpdate.Vuid}`}
              translationDoesNotExistCopy={translationDoesNotExistCopy}
            />
          ))}
        </Styled.RecentList>
      )}
      <Styled.CenterWrapper>
        {recentUpdates &&
          recentUpdates.length > updatesToShow &&
          updatesToShow < MAX_UPDATES_TO_SHOW && (
            <Button primary={false} onClick={addMoreUpdates}>
              {loadMoreButtonLabel}
            </Button>
          )}
        {recentUpdates &&
          updatesToRender &&
          recentUpdates.length <= updatesToRender.length && (
            <ButtonLink primary={false} href='/teaching-material'>
              {goToFilterPageButtonLabel}
            </ButtonLink>
          )}
      </Styled.CenterWrapper>
    </PageContainer>
  )
}

export default RecentUpdates
