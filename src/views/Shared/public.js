// elems for Login/Register
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledError = styled.p`
  color: red;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledRow = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;

export const PageTitle = styled.div`
  font-size: 2.5rem;
  margin-top: 4rem;
`;
export const PageDescription = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const StyledButton = styled(motion.button)`
  position: relative;
  font-size: 1rem;
  letter-spacing: 4px;
  line-height: 2.5rem;
  display: block;
  text-align: center;
  border: 1px solid #ba55d3;
  color: #ba55d3;
  background-color: transparent;
  border-radius: 0.2rem;
  width: 10rem;
  height: 2.5rem;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: all 1s;
  background-size: 200%;
  background-position: 100% 0;
  background-image: linear-gradient(45deg, #ba55d3 50%, transparent 50%);
  :focus {
    outline: none;
  }
  :hover {
    background-position: 0 100%;
    color: ${({ theme }) => theme.colors.ground};
  }
`;

export const Input = styled.input`
  height: 40px;
  width: 350px;
  border: 2px solid #aaa;
  border-radius: 20px;
  padding-left: 20px;
  margin: 8px 0;
  outline: none;
  box-sizing: border-box;
  transition: 0.3s;
  :hover {
    border-color: #993399;
    box-shadow: 0 0 8px 0 #990099;
  }
  :focus {
    border-color: #993399;
    box-shadow: 0 0 8px 0 #990099;
  }
`;

export const StyledInput = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 350px;
`;
