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
  console.log('DataStructure props:', {
    dataStructureDesktop,
    dataStructureMobile,
  })

  // Placeholder URLs - nu med .png format
  const placeholderDesktop =
    'https://placehold.co/800x600.png?text=Desktop+Structure'
  const placeholderMobile =
    'https://placehold.co/400x600.png?text=Mobile+Structure'

  // Använd antingen den riktiga bilden eller placeholder
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
          <Image
            src={desktopImageUrl}
            alt={
              dataStructureDesktop?.data?.attributes?.alternativeText ||
              'Desktop structure'
            }
            width={800}
            height={600}
            priority
            onError={(e) => {
              console.error('Failed to load desktop image:', desktopImageUrl)
              const target = e.target as HTMLImageElement
              target.src = placeholderDesktop
            }}
          />
          <Image
            src={mobileImageUrl}
            alt={
              dataStructureMobile?.data?.attributes?.alternativeText ||
              'Mobile structure'
            }
            width={400}
            height={600}
            priority
            onError={(e) => {
              console.error('Failed to load mobile image:', mobileImageUrl)
              const target = e.target as HTMLImageElement
              target.src = placeholderMobile
            }}
          />
        </Styled.ImageWrapper>
      </Styled.Wrapper>
    </PageContainer>
  )
}

export default DataStructureFigure
