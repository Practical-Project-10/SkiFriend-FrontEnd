import React, { forwardRef } from "react";
import styled from "styled-components";

import { Text, Grid, Button } from "./index";

const Input = forwardRef((props, ref) => {
  const {
    label,
    placeholder,
    _onChange,
    _onKeyPress,
    autocomplete,
    contentType,
    type,
    pattern,
    position,
    inputMode,
    _readOnly,
    _value,
    more4,
    dupButton,
    _name,
    _onBlur,
    _onClick,
    _onInput,
    buttonText,
    width,
    border,
    padding,
    blue,
    margin,
    height,
    _maxLength,
    _disabled,
    free,
    radius,
    title,
    _defaultValue,
    size,
    step,
    autocapitalize,
    send,
  } = props;

  const style = {
    more4,
    width,
    border,
    padding,
    position,
    radius,
    height,
    margin,
  };

  if (dupButton) {
    return (
      <Grid>
        {label && (
          <Text block margin="0 0 7px 0" size={size}>
            {label}
          </Text>
        )}
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
            autocapitalize={autocapitalize}
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
          <Text block margin="0 0 7px 0" size="12px" color="#6195CF">
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
          step={step}
          autoComplete={autocomplete}
          placeholder={placeholder}
          onChange={_onChange}
          maxLength={_maxLength}
          onInput={_onInput}
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
          autoComplete={autocomplete}
          defaultValue={_defaultValue}
          value={_value}
          name={_name}
          maxLength={_maxLength}
          onKeyPress={_onKeyPress}
        />
        <Text block margin="0 0 7px 0" size="12px">
          {label}
        </Text>
      </React.Fragment>
    );
  }

  if (title) {
    return (
      <Title
        autoComplete={autocomplete}
        placeholder={placeholder}
        maxLength={_maxLength}
        onChange={_onChange}
        value={_value}
      ></Title>
    );
  }

  // if (textarea) {
  //   return (
  //     <Textarea
  //       placeholder={placeholder}
  //       onChange={_onChange}
  //       value={_value}
  //     ></Textarea>
  //   );
  // }
  if (send) {
    return (
      <Send
        onKeyPress={_onKeyPress}
        autoComplete={autocomplete}
        autocapitalize={autocapitalize}
        placeholder={placeholder}
        onChange={_onChange}
        value={_value}
        readOnly={_readOnly}
      />
    );
  }

  return (
    <Grid>
      {label && (
        <Text block margin="0 0 7px 0" size={size}>
          {label}
        </Text>
      )}
      <ElInput
        {...style}
        ref={ref}
        name={_name}
        textContentType={contentType}
        autoComplete={autocomplete}
        autocapitalize={autocapitalize}
        pattern={pattern}
        inputMode={inputMode}
        defaultValue={_defaultValue}
        value={_value}
        onBlur={_onBlur}
        type={type}
        placeholder={placeholder}
        disabled={_disabled}
        onChange={_onChange}
        autocomplete={autocomplete}
        maxLength={_maxLength}
        onKeyPress={_onKeyPress}
        // onInput={maxLengthCheck(this)}
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

const Send = styled.input`
  width: 100%;
  height: 38px;
  padding: 14px 8px;
  border: 1px solid #a3a6ab;
  border-radius: 40px;
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
  position: ${(props) => props.position};
  border-radius: ${(props) => props.radius};
`;

const Title = styled.input`
  width: 100%;
  padding: 22px 0;
  border: none;
  border-bottom: 1px solid black;
  font-size: 20px;
  font-weight: 700;
  &:focus {
    outline: none;
  }
`;

// const Textarea = styled.textarea`
//   width: 90%;
//   height: 300px;
//   max-width: 400px;
//   padding: 10px 0;
//   border: none;
//   &:focus {
//     outline: none;
//     resize: none;
//   }
// `;

export default Input;
