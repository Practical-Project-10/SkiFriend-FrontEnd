import React from "react";
import styled from "styled-components";
import { Grid } from ".";

const Button = (props) => {
  const {
    _name,
    text,
    _onClick,
    children,
    padding,
    bg,
    width,
    height,
    color,
    margin,
    // floatting,
  } = props;

  const styles = {
    bg,
    padding,
    width,
    height,
    color,
    margin,
  };

  // if(floatting) {
  //   return(
  //     <Grid>

  //     </Grid>
  //   )
  // }

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick} name={_name}>
        {children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  children: null,
  _onClick: () => {},
  width: "100%",
  padding: "21px 0",
  color: "#FFF",
};

const ElButton = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${props => props.margin};
  padding: ${props => props.padding}; 
  color: ${props => props.color}; 
  background-color: ${props => props.bg? props.bg: '#474D56'};
  border: none;
  border-radius: 8px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
`;

export default Button;

// //---- 기본 return Button ----
// const ElButton = styled.button`
//   width: ${(props) => props.width};
//   padding: ${(props) => props.padding};
//   margin: ${(props) => props.margin};
//   position: ${(props) => props.position};
//   background-color: ${(props) => props.bgColor};
//   border: ${(props) => props.border};
//   box-sizing: border-box;
//   ${(props) => (props.className ? `className: ${props.className}` : "")};
//   cursor: pointer;
// `;

// const BigBtn = styled.button`
//   width: 100%;
//   padding: ${(props) => props.padding};
//   margin: ${(props) => props.margin};
//   background-color: ${(props) => props.bgColor};
//   cursor: pointer;
// `;

// const SmallBtn = styled.button`
//   color: white;
//   background: orange;
//   font-weight: 800;
//   width: 4.5em;
//   border: none;
//   border-radius: 5px;
//   margin: ${(props) => props.margin};
//   font-size: ${(props) => props.size};
//   cursor: pointer;
// `;

// const FloatButton = styled.button`
//   font-size: 30px;
//   width: 50px;
//   height: 50px;
//   background: orange;
//   border: none;
//   border-radius: 50%;
//   &:hover {
//     opacity: 0.9;
//     cursor: pointer;
//   }
// `;

// const PlaceBtn = styled.button`
//   width: 90%;
//   margin: 10px auto;
//   padding: 10px;
// `;

// const NormalButton = styled.button`
//   width: 120px;
//   padding: 5px 0;
//   margin: 5px auto;
// `;
