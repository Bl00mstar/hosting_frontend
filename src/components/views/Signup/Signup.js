import React from 'react';
import styled from 'styled-components';

export default function Signup() {
  return (
    <div>
      <div>Sign up</div>
      <form>
        <StyledInput>
          <Input type="text" placeholder="First Name"></Input>
          <Input type="text" placeholder="Last Name"></Input>
          <Input type="text" placeholder="E-mail"></Input>
          <Input type="text" placeholder="Username"></Input>
          <Input type="text" placeholder="Password"></Input>
          <Input type="text" placeholder="Confirm password"></Input>
        </StyledInput>
      </form>
    </div>
  );
}

const Input = styled.input`
  height: 40px;
  font-size: 18px;
  width: 100%;
  border: 2px solid #aaa;
  border-radius: 20px;
  padding-left: 40px;
  padding-right: 100px;
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

const StyledInput = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 450px;
  select {
    top: 8px;
    font-size: 18px;
    outline: none;
    right: 0.5rem;
  }
  svg {
    position: absolute;
    left: 0;
    top: 8px;
    padding: 9px 8px;
    fill: black;
    transition: 0.3s;
    :hover {
      fill: #990099;
    }
  }
  input:focus + svg {
    fill: #990099;
  }
  &.inputWithIcon {
    position: relative;
  }
`;
