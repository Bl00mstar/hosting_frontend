import React from 'react';
import styled from 'styled-components';
import HomeImage from '@assets/undrawColl.svg';
import { motion } from 'framer-motion';
import Characters from './Characters';

export default function Home() {
  return (
    <StyledRow>
      <LeftColumn>
        <Characters />
      </LeftColumn>
      <RightColumn>
        <StyledImage src={HomeImage}></StyledImage>
      </RightColumn>
    </StyledRow>
  );
}

export const MotionSpan = styled(motion.span)`
  display: inline-block;
  font-size: 4rem;
  color: red;
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const LeftColumn = styled.div`
  overflow: visible;
  margin-top: 25px;
  margin-right: 25px;
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;

}
`;
const RightColumn = styled.div`
  position: relative;
  flex: 0 0 60%;
  margin-top: 25px;
  margin-right: 25px;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 1160px) {
    flex: 0 0 50%;
  }
`;

const StyledRow = styled.div`
  box-sizing: border-box;
  clear: both;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
