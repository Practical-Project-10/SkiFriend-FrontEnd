import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    children,
    _onClick,
    className,
    align
  } = props;

  const style = {
    align,
  };

  if(className === 'profileForm') {
    return(
      <ProfileForm>
        {children}
      </ProfileForm>
    )
  }

  return (
    <React.Fragment>
      <GridBox {...style} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  _onClick: () => {},
};

const GridBox = styled.div`
  width: 70%;
  margin: auto;
  text-align: ${props => props.align? props.align: ''};
`;

const ProfileForm = styled.div`
  padding: 0 24px;
  display: flex;
  flex-direction: column;
`

export default Grid;
