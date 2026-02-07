import styled from '@emotion/styled'
import {
  Accent40,
  OnAccent40,
  Background,
  Neutral40,
  OnNeutral40,
  mq,
} from '../../styles/global'

export const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export const Banner = styled.div`
  background: ${Background};
  border-radius: 8px;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${mq.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }
`

export const Content = styled.div`
  flex: 1;
`

export const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
  color: #242424;

  ${mq.sm} {
    font-size: 2rem;
  }
`

export const Description = styled.p`
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.6;
  color: #424242;

  ${mq.sm} {
    font-size: 1.6rem;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  ${mq.sm} {
    flex-direction: row;
    width: auto;
  }
`

const BaseButton = styled.button`
  padding: 1.2rem 2.4rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-width: 140px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid ${Accent40};
    outline-offset: 2px;
  }
`

export const AcceptButton = styled(BaseButton)`
  background: ${Accent40};
  color: ${OnAccent40};

  &:hover {
    background: #013080;
  }
`

export const DeclineButton = styled(BaseButton)`
  background: ${Neutral40};
  color: ${OnNeutral40};

  &:hover {
    background: #5a5a5a;
  }
`
