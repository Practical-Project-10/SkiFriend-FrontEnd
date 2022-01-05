import React, { forwardRef } from "react";
import styled from "styled-components";

import { Text, Grid, Button } from "./index";

const Input = forwardRef((props, ref) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    _value,
    more4,
    dupButton,
    _name,
    _onBlur,
    _onClick,
    buttonText,
    width,
    border,
    padding,
    blue,
    margin,
    height,
    _maxLength,
    free,
    radius,
  } = props;

  const style = {
    more4,
    width,
    border,
    padding,
    radius,
    height,
    margin,
  };

  if (dupButton) {
    return (
      <Grid>
        {label && <Text margin="0 0 7px 0">{label}</Text>}
        <Grid display="flex" gap="11px">
          <DupButton
            {...style}
            ref={ref}
            type={type}
            name={_name}
            value={_value}
            onBlur={_onBlur}
            placeholder={placeholder}
            onChange={_onChange}
          />
          <Button
            _name={_name}
            width="27%"
            bg="#B5CCE5"
            color="#474D56"
            padding="13px 0px"
            _onClick={_onClick}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (blue) {
    return (
      <Grid>
        {label && (
          <Text size="12px" color="#6195CF" margin="0 0 7px 0">
            {label}
          </Text>
        )}
        <ElInput
          {...style}
          border="1px solid #474D56"
          ref={ref}
          name={_name}
          value={_value}
          onBlur={_onBlur}
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
        />
      </Grid>
    );
  }

  if (free) {
    return (
      <React.Fragment>
        <FreeInput
          {...style}
          placeholder={placeholder}
          type={type}
          id={type}
          onBlur={_onBlur}
          onChange={_onChange}
          onClick={_onClick}
          value={_value}
          name={_name}
          maxLength={_maxLength}
        />
        <Text>{label}</Text>
      </React.Fragment>
    );
  }
  return (
    <Grid>
      {label && <Text margin="0 0 7px 0">{label}</Text>}
      <ElInput
        {...style}
        ref={ref}
        name={_name}
        value={_value}
        onBlur={_onBlur}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
      />
    </Grid>
  );
});

Input.defaultProps = {
  multiLine: false,
  label: false,
  type: "text",
  value: "",
  width: "100%",
  padding: "14px 8px",
  border: "1px solid #6195CF",
  _onChange: () => {},
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  /* margin: ${(props) => (props.more4 ? "0 0 33px 0" : "0 0 41px 0")}; */
  border: ${(props) => props.border};
  border-radius: 6px;
  box-sizing: border-box;
`;

const DupButton = styled.input`
  border: 1px solid #212121;
  width: 70%;
  padding: 14px 8px;
  /* margin: ${(props) => (props.more4 ? "0 11px 33px 0" : "0 11px 41px 0")}; */
  border: 1px solid #6195cf;
  border-radius: 6px;
  box-sizing: border-box;
`;

const FreeInput = styled.input`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.radius};
`;

export default Input;

// import React from "react";
// import styled from "styled-components";
// import Text from "./Text";

// const Input = (props) => {
//   const {
//     label,
//     placeholder,
//     _onChange,
//     _onClick,
//     type,
//     margin,
//     height,
//     width,
//     padding,
//     _value,
//     _onBlur,
//     _name,
//     inline,
//     title,
//     textarea,
//     signup,
//     profile,
//     _disabled,
//     _maxLength,
//   } = props;

//   const style = {
//     inline,
//   };

//   if (title) {
//     return (
//       <Title
//         placeholder={placeholder}
//         onChange={_onChange}
//         value={_value}
//       ></Title>
//     );
//   }
//   if (textarea) {
//     return (
//       <Textarea
//         placeholder={placeholder}
//         onChange={_onChange}
//         value={_value}
//       ></Textarea>
//     );
//   }
//   if (signup) {
//     return (
//       <React.Fragment>
//         <Text margin="0">{label}</Text>
//         <SignupInput
//           type={type}
//           placeholder={placeholder}
//           onChange={_onChange}
//           value={_value}
//           onBlur={_onBlur}
//           name={_name}
//         ></SignupInput>
//       </React.Fragment>
//     );
//   }
//   if (profile) {
//     return (
//       <React.Fragment>
//         <Text margin="0" size="13px" {...style}>
//           {label}
//         </Text>
//         <ProfileInput
//           width={width}
//           onChange={_onChange}
//           onBlur={_onBlur}
//           value={_value}
//           name={_name}
//           disabled={_disabled}
//         />
//       </React.Fragment>
//     );
//   }
//   return (
//     <React.Fragment>
//       <ElInput
//         placeholder={placeholder}
//         type={type}
//         id={type}
//         margin={margin}
//         width={width}
//         height={height}
//         padding={padding}
//         onBlur={_onBlur}
//         onChange={_onChange}
//         onClick={_onClick}
//         value={_value}
//         name={_name}
//         maxLength={_maxLength}
//       />
//       <Text>{label}</Text>
//     </React.Fragment>
//   );
// };

// Input.defaultProps = {

// }

// const ElInput = styled.input`

// `

// // const ElInput = styled.input`
// //   width: ${(props) => props.width};
// //   height: ${(props) => props.height};
// //   padding: ${(props) => props.padding};
// //   box-sizing: border-box;
// //   margin: ${(props) => props.margin};
// // `;

// const Title = styled.input`
//   width: 80%;
//   border: none;
//   border-bottom: 1px solid black;
//   &:focus {
//     outline: none;
//   }
// `;
// const Textarea = styled.textarea`
//   width: 90%;
//   height: 400px;
//   max-width: 400px;
//   padding: 10px;
//   border: none;
//   &:focus {
//     outline: none;
//     resize: none;
//   }
// `;

// const SignupInput = styled.input`
//   width: 70%;
//   margin-bottom: 10px;
// `;

// const ProfileInput = styled.input`
//   width: ${(props) => (props.width ? props.width : "")};
//   height: 17px;
// `;
// export default Input;
