import React from "react";
import styled from "styled-components";

import { Text, Grid, Button } from "./index";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    value,
    writePage,
    dupButton,
    _value,
    _onBlur,
    _name,
  } = props;

  const style = {
    writePage,
  };

  if (dupButton) {
    return (
      <Grid>
        {label && (
          <Text size="14px" margin="0 0 7px 0">
            {label}
          </Text>
        )}
        <Grid is_flex justify="space-between">
          <DupButton
            {...style}
            type={type}
            placeholder={placeholder}
            onChange={_onChange}
          />
          <Button width="27%">중복확인</Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && (
          <Text size="14px" margin="0 0 7px 0">
            {label}
          </Text>
        )}
        <ElInput
          {...style}
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          value={_value}
          onBlur={_onBlur}
          name={_name}
        />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  _onChange: () => {},
};

const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 8px;
  margin: ${(props) => (props.writePage ? "0 0 49px 0" : "0 0 64px 0")};
  border: 1px solid #6195cf;
  border-radius: 6px;
  box-sizing: border-box;
`;

const DupButton = styled.input`
  border: 1px solid #212121;
  width: 70%;
  padding: 12px 8px;
  margin: ${(props) => (props.writePage ? "0 0 51px 0" : "0 11px 64px 0")};
  border: 1px solid #6195cf;
  border-radius: 6px;
  box-sizing: border-box;
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
