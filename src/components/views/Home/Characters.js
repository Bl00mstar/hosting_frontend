import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

let text = 'Manage your files';
let textArr = text.split(' ');

const transition = {
  ease: [0.5, 0.01, -0.05, 0.9],
};

const animationVariant = {
  animate: (i) => ({
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.18,
      staggerDirection: i,
    },
  }),
};

const letterVariant = {
  initial: { opacity: 0, y: '120%' },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ...transition,
    },
  },
};

export const StyledText = styled(motion.span)`
  font-size: 50px;
  font-family: Times;
`;

export const StyledParagraph = styled(motion.h1)`
  text-align: center;
`;

const chars = textArr.map((el, key) => {
  return (
    <StyledParagraph
      key={key}
      variants={animationVariant}
      initial="initial"
      animate="animate"
    >
      {el.split('').map((letter, index) => (
        <StyledText key={index} variants={letterVariant}>
          {letter}
        </StyledText>
      ))}
    </StyledParagraph>
  );
});

export default function Characters() {
  return <>{chars}</>;
}
