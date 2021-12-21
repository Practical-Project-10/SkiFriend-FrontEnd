import React from "react";
import styled from "styled-components";
import Text from "./Text";

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
      <Text margin='0'>{label}</Text>
      <SignupInput
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={_value}
      ></SignupInput>
    </React.Fragment>
  );
};

Input.defaultProps = {
  width: "100%",
};

const SignupInput = styled.input`
  width: 70%;
  margin-bottom: 10px;
`

export default Input;
