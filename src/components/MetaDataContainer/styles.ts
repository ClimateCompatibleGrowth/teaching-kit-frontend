import styled from "@emotion/styled";


export const StyledMetaDataContainer = styled.div`
  width: 20%;
  border: 2px grey solid;
  margin-left: 32px;
  margin-top: 32px;
  background: #393939;
  padding: 0px 12px;
  overflow: hidden;
`

export const StyledUl = styled.ul`
  padding-left: 16px;
`

export const StyledLi = styled.li`
  a {
    color: #0070f3;
    text-decoration: underline;

    &:hover {
      color: white;
    }
  }
`

export const DownloadContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`