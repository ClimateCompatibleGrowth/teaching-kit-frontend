import React from 'react'

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
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'development') {
    dataStructureDesktop.data.attributes.url = `https://${process.env.NEXT_PUBLIC_S3_HOST}/datastructure_Desktop_f37347020d.svg`
    dataStructureMobile.data.attributes.url = `https://${process.env.NEXT_PUBLIC_S3_HOST}/data_Structure_Mobile_b19377e567.svg`
  }

  return (
    <PageContainer>
      <Styled.Header> {HowTheTeachingMaterialIsStructured}</Styled.Header>
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
          <Styled.DesktopImage
            src={dataStructureDesktop.data.attributes.url}
            alt={dataStructureDesktop.data.attributes.alternativeText}
          />
          <Styled.MobileImage
            src={dataStructureMobile.data.attributes.url}
            alt={dataStructureMobile.data.attributes.alternativeText}
          />
        </Styled.ImageWrapper>
      </Styled.Wrapper>
    </PageContainer>
  )
}

export default DataStructureFigure
