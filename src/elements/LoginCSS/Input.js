import React from "react";
import styled from "styled-components";
import {Text, Grid} from './index'

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    _value,
  } = props;

  return (
    <React.Fragment>
      <Text size margin='0'>{label}</Text>
      <LoginInput
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={_value}
      ></LoginInput>
    </React.Fragment>
  );
};

Input.defaultProps = {
  width: "100%",
};

const LoginInput = styled.input`
  width: 70%;
  margin: 0 0 15px;
`

export default Input;
