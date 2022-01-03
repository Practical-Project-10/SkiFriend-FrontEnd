import React from "react";
import styled from 'styled-components';

const Header = () => {
  return (
    <React.Fragment>
      <Head>스키프렌드</Head>
    </React.Fragment>
  );
};

const Head = styled.div`
  width: 100%;
  padding: 13px 16px;
  font-weight: bold;
  font-size: 22px;
  line-height: 26px;
  border: 1px solid #000;
`

export default Header;
