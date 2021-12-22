import React from "react";
import styled from "styled-components";
import Text from "./Text";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    margin,
    height,
    width,
    padding,
    _value,
    textarea,
    title,
  } = props;

  if (title) {
    return <Title></Title>;
  }
  if (textarea) {
    return <Textarea placeholder={placeholder}></Textarea>;
  }
  return (
    <React.Fragment>
      <Text>{label}</Text>
      <ElInput
        placeholder={placeholder}
        onChange={_onChange}
        type={type}
        id={type}
        margin={margin}
        width={width}
        height={height}
        value={_value}
        padding={padding}
      />
    </React.Fragment>
  );
};

Input.defaultProps = {};

const Title = styled.input`
  width: 80%;
  border: none;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }
`;
const Textarea = styled.textarea`
  width: 90%;
  height: 500px;
  max-width: 400px;
  padding: 10px;
  border: none;
  &:focus {
    outline: none;
    resize: none;
  }
`;

const ElInput = styled.input`
  border: 1px solid #87cefa;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  margin: ${(props) => props.margin};
`;

export default Input;
