import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const {
    src,
    size,
    height,
    width,
    margin,
    _onClick,
    radius,
    className,
    myIcon,
  } = props;

  const styles = {
    src,
    size,
    width,
    height,
    margin,
    _onClick,
    radius,
    className,
  };

  if (myIcon) {
    return (
      <React.Fragment>
        <MyIcon {...styles} onClick={_onClick} />
      </React.Fragment>
    );
  }
  
  return (
    <React.Fragment>
      <ElImage {...styles} onClick={_onClick} />
    </React.Fragment>
  );
};

Image.defaultProps = {
  shape: "myIcon",
  src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBhARBxAPFRESEg0PDhAQDw8PEhUQFRYXHRUVFRMZHSggGBolHRUVITEhJTUrLi4uIx8zODMtNygtLisBCgoKDg0NGxAQFTcZHR8rLS0rKy03LTgtLS0tKzctLS0rLS83KysrOCstMCstKy0tLTctKy0tNy0rLS0rLTctK//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAMRABAAECAwUFCAIDAAAAAAAAAAECAwQRMQUhMlFxEhNBYZEiM0KBobHB0TSSFFJy/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAMCAQQF/8QAHREBAQEBAAIDAQAAAAAAAAAAAAECEQMxEiFRQf/aAAwDAQACEQMRAD8A6wB9F80AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHtNE1z7ETPSM2+nA3Kvh9ZiHOx3lRxJnAXI+H6w0XLVVv3kTHWDsOViA64AAAAAAAAAAAAAAAAAAAAAAa6LDC7OzjO/8A1/bPZ2F7NPbuazwxyjmnpa3/ACK5x/a8ooiinKiIiPJ6CagTGcbwBBxOz4rjOzunl4T+lZVTNFWVUZTGsOhRcfhe/ozp4o0845KZ3+sax+KcBVEAAAAAAAAAAAAAAAAAAbcJa77ERE6az0hqWGyKd9U9IZ1eRrM7VkAguAAAAAAp9o2u6xGcaVb/AJ+KKtNrU52YnlP3Va+b2IanKANMgAAAAAAAAAAAAAAACz2R7urrH2VifsmvK5VTPjGcfJnfpvHtZgILAAAAAAIm0/4k9aVQs9rV5W6aec5+isWx6R37AG2AAAAAAAAAAAAAAAABnZuTauxVHgwB10NFcV0RNOk74eqjAYvuZ7Nzhn6St4nONyGs8XzrsAGXQAAmco3it2hjO1HYtafFP4h2TrlvIi4y939+ZjTSOjSC8QoA64AAAAAAAAAAAAAAAAAAN+GxdVjh3xyloHLOuy8XFrH0XOKcp8/2kU1xVwzE9Jhz7xi+ONzyV0U1RTrMerRdxtu345zyjepHpPGXyJWJx1V7dTup5eM9ZRQbk4xb0AdcAAAAAAAAAAAAAAAAAABssWKr9WVuOs+ELPD4Ci1vr9qfPT0ZupGpm1WWrFd33dMz5+HqlW9mVT7yqI6b1poJ3dUmIhU7NojimqfSGcYC1yn1lKGflf1r4z8Rv8C1/rP9pYVbNonhmqPnmmB8r+nxn4rK9mTHu6onrGSLdw9drjpnrrHqvRqbrNxHOi4xGBou8O6ecfpWYjD1WKvbjd4TGik1Knc2NQDTIAAAAAAAAAAAAAAk4PCTiJzq3U8+fRjg8N/kXN/DGs/hdU0xTTlTpGjGtc+opnPft5RRFunKiMoZAiqAAAAAAAAPKqYrpyrjOOUvQFRjcFNnfb30/ZEdFMZxvU+OwvcV50cM6eU8lc679VLeefcRQFEwAAAAAAAAAB7TTNVURTrO6Hidsq12rs1T8O6OsuW8jsnasMPZixaimPnPOWwHnegAAAAAAAAAAAAY3bcXbcxVpLIBz923Nq5NNWsMVjta1uiuOk/hXPRm9iGpygDrIAAAAAAAAutn2+7wseftT81Lq6Gins0REeERCfkv0p4/b0BJUAAAAAAAAAAAAABrxNvvbFUeU5dVC6JQXqexeqjlMx9VPHU/JGACqQAAAAAAADK1vuU9Y+7oHP2fe0/9U/d0CXkV8YAmoAAAAAAAAAAAAAAKPGxli6+q8UmO/l19fwp4/bHk9NACqIAAAD//2Q==",
  _onClick: () => {},
};

const MyIcon = styled.div`
  width: 3.5em;
  height: 3.5em;
  border-radius: 50%;
  margin-right: 10px;
  background-size: cover;
  background-position: center;
  background: ${props => `url(${props.src}) no-repeat center`};
`;

const ElImage = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => props.radius};
  background: ${props => props.src? `url(${props.src}) no-repeat center`: ''};
  background-size: ${(props) => props.size};
`;

export default Image;
