import React from 'react'
import Image from 'next/image'
import * as Styled from './styles'
import { PageContainer } from '../../styles/global'
import { DataStructureCopy } from '../../types/index'

type Props = DataStructureCopy

const DataStructureFigure = ({
  HowTheTeachingMaterialIsStructured,
  InfoTextCourseLectureLectureBlock,
  InfoTextCourseStructure,
  dataStructureDesktop,
  dataStructureMobile,
}: Props) => {
  // placeholder URL
  const placeholderDesktop =
    'https://placehold.co/800x600.png?text=Desktop+Structure'
  const placeholderMobile =
    'https://placehold.co/400x600.png?text=Mobile+Structure'

  // Use either the actual image or placeholder
  const desktopImageUrl =
    dataStructureDesktop?.data?.attributes?.url || placeholderDesktop
  const mobileImageUrl =
    dataStructureMobile?.data?.attributes?.url || placeholderMobile

  return (
    <PageContainer>
      <Styled.Header>{HowTheTeachingMaterialIsStructured}</Styled.Header>
      <Styled.Wrapper>
        <Styled.ContentWrapper>
          <Styled.LeftContainer>
            <Styled.LeftTitle>{InfoTextCourseStructure}</Styled.LeftTitle>
          </Styled.LeftContainer>
          <Styled.RightContainer>
            <Styled.RightTitle>
              {InfoTextCourseLectureLectureBlock}
            </Styled.RightTitle>
          </Styled.RightContainer>
        </Styled.ContentWrapper>
        <Styled.ImageWrapper>
          <Styled.DesktopImageWrapper>
            <Image
              src={desktopImageUrl}
              alt={
                dataStructureDesktop?.data?.attributes?.alternativeText ||
                'Desktop structure'
              }
              fill
              style={{ objectFit: 'contain' }}
              priority
              onError={(e) => {
                console.error('Failed to load desktop image:', desktopImageUrl)
                const target = e.target as HTMLImageElement
                target.src = placeholderDesktop
              }}
            />
          </Styled.DesktopImageWrapper>
          <Styled.MobileImageWrapper>
            <Image
              src={mobileImageUrl}
              alt={
                dataStructureMobile?.data?.attributes?.alternativeText ||
                'Mobile structure'
              }
              fill
              style={{ objectFit: 'contain' }}
              priority
              onError={(e) => {
                console.error('Failed to load mobile image:', mobileImageUrl)
                const target = e.target as HTMLImageElement
                target.src = placeholderMobile
              }}
            />
          </Styled.MobileImageWrapper>
        </Styled.ImageWrapper>
      </Styled.Wrapper>
    </PageContainer>
  )
}

export default DataStructureFigure
