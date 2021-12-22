import React from "react";
import styled from "styled-components";
import Text from "./Text";

const Input = (props) => {
  const {
    label,
    width,
    inline,
  } = props;

  const style = {
    inline,
  }

  return (
    <React.Fragment>
      {label
        ?(<Text margin='0' size='13px' {...style}>{label}</Text>)  
        :""
      }
      <ElInput width={width}/>
    </React.Fragment>
  );
};



const ElInput = styled.input`
  width: ${props => props.width? props.width: ''};
  height: 17px;
`;

export default Input;
