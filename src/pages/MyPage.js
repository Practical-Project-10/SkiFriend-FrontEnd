
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../redux/modules/profile";
import { userActions } from "../redux/modules/user";
import { carpoolActions } from "../redux/modules/carpool";

import { Grid, Button, Image, Text } from "../elements/index";
import Card from "../components/Card";

const MyPage = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const basicImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBhARBxAPFRESEg0PDhAQDw8PEhUQFRYXHRUVFRMZHSggGBolHRUVITEhJTUrLi4uIx8zODMtNygtLisBCgoKDg0NGxAQFTcZHR8rLS0rKy03LTgtLS0tKzctLS0rLS83KysrOCstMCstKy0tLTctKy0tNy0rLS0rLTctK//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAMRABAAECAwUFCAIDAAAAAAAAAAECAwQRMQUhMlFxEhNBYZEiM0KBobHB0TSSFFJy/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAMCAQQF/8QAHREBAQEBAAIDAQAAAAAAAAAAAAECEQMxEiFRQf/aAAwDAQACEQMRAD8A6wB9F80AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHtNE1z7ETPSM2+nA3Kvh9ZiHOx3lRxJnAXI+H6w0XLVVv3kTHWDsOViA64AAAAAAAAAAAAAAAAAAAAAAa6LDC7OzjO/8A1/bPZ2F7NPbuazwxyjmnpa3/ACK5x/a8ooiinKiIiPJ6CagTGcbwBBxOz4rjOzunl4T+lZVTNFWVUZTGsOhRcfhe/ozp4o0845KZ3+sax+KcBVEAAAAAAAAAAAAAAAAAAbcJa77ERE6az0hqWGyKd9U9IZ1eRrM7VkAguAAAAAAp9o2u6xGcaVb/AJ+KKtNrU52YnlP3Va+b2IanKANMgAAAAAAAAAAAAAAACz2R7urrH2VifsmvK5VTPjGcfJnfpvHtZgILAAAAAAIm0/4k9aVQs9rV5W6aec5+isWx6R37AG2AAAAAAAAAAAAAAAABnZuTauxVHgwB10NFcV0RNOk74eqjAYvuZ7Nzhn6St4nONyGs8XzrsAGXQAAmco3it2hjO1HYtafFP4h2TrlvIi4y939+ZjTSOjSC8QoA64AAAAAAAAAAAAAAAAAAN+GxdVjh3xyloHLOuy8XFrH0XOKcp8/2kU1xVwzE9Jhz7xi+ONzyV0U1RTrMerRdxtu345zyjepHpPGXyJWJx1V7dTup5eM9ZRQbk4xb0AdcAAAAAAAAAAAAAAAAAABssWKr9WVuOs+ELPD4Ci1vr9qfPT0ZupGpm1WWrFd33dMz5+HqlW9mVT7yqI6b1poJ3dUmIhU7NojimqfSGcYC1yn1lKGflf1r4z8Rv8C1/rP9pYVbNonhmqPnmmB8r+nxn4rK9mTHu6onrGSLdw9drjpnrrHqvRqbrNxHOi4xGBou8O6ecfpWYjD1WKvbjd4TGik1Knc2NQDTIAAAAAAAAAAAAAAk4PCTiJzq3U8+fRjg8N/kXN/DGs/hdU0xTTlTpGjGtc+opnPft5RRFunKiMoZAiqAAAAAAAAPKqYrpyrjOOUvQFRjcFNnfb30/ZEdFMZxvU+OwvcV50cM6eU8lc679VLeefcRQFEwAAAAAAAAAB7TTNVURTrO6Hidsq12rs1T8O6OsuW8jsnasMPZixaimPnPOWwHnegAAAAAAAAAAAAY3bcXbcxVpLIBz923Nq5NNWsMVjta1uiuOk/hXPRm9iGpygDrIAAAAAAAAutn2+7wseftT81Lq6Gins0REeERCfkv0p4/b0BJUAAAAAAAAAAAAABrxNvvbFUeU5dVC6JQXqexeqjlMx9VPHU/JGACqQAAAAAAADK1vuU9Y+7oHP2fe0/9U/d0CXkV8YAmoAAAAAAAAAAAAAAKPGxli6+q8UmO/l19fwp4/bHk9NACqIAAAD//2Q==";
  const is_login = localStorage.getItem('is_login');
  const is_profile = localStorage.getItem('is_profile');
  // const is_profile = useSelector(state => state.profile.is_profile);
  console.log(is_profile)
  const user_profile = useSelector(state => state.profile.user_profile);
  const myCarpool = useSelector(state => state.carpool.myList);
  console.log(myCarpool)

  React.useEffect(() => {
    if(!is_login) {
      return null;
    }

    dispatch(profileActions.getProfileDB());
    dispatch(carpoolActions.getMyCarpoolDB());
  }, [])

  const deleteUser = () => {
    dispatch(userActions.deleteUserInfoDB());
  }

  if (!is_login) {
    return (
      //로그인 안한 경우
      <React.Fragment>
        <Grid bg="yellow">
          <Grid header> 마이페이지</Grid>
          <Grid is_flex justify="space-between" borderB="1px solid #dbdbdb">
            <Grid is_flex>
              <Image myIcon />
              <Text>로그인을 해주세요</Text>
            </Grid>
            <Grid>
              <Button smallBtn _onClick={() => history.push('/login')}>로그인</Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid>
            <Text>사용자 피드백을 남겨주세요.</Text>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  return (
    //로그인 한 경우
    <React.Fragment>
      <Grid bg="yellow">
        <Grid header> 마이페이지</Grid>
        <Grid is_flex justify="space-between" borderB="1px solid #dbdbdb">
          <Grid is_flex>
            <Image myIcon src={user_profile.profileImg === null? basicImage: user_profile.profileImg}/>
            <Text>{user_profile.nickname}</Text>
          </Grid>
          <Grid>
            {is_profile
              ? <Button smallBtn _onClick={() => {history.push(`/profilewrite/${user_profile.username}`)}}>프로필 수정</Button>
              : <Button smallBtn _onClick={() => {history.push('/profilewrite')}}>등록하기</Button>
            }
            <Button smallBtn _onClick={deleteUser}>회원탈퇴</Button>
          </Grid>
        </Grid>
        <Grid>
          <Text>자기소개</Text>
          <Text>스키와 커피를 즐기는 남자</Text>
        </Grid>
      </Grid>

      <Grid>
        <Text>사용자 피드백을 남겨주세요.</Text>
      </Grid>
      <Grid is_flex>
        <Grid width="40%" margin="0 10px">
          <Text>[카풀제공]</Text>
          <Text>하이원 - 서울</Text>
          <Text>날짜: 2001-12-01</Text>
          <Text>시간: 15시</Text>
          <Text>완료</Text>
        </Grid>
        <Grid width="40%" margin="0 10px">
          <Text>[카풀제공]</Text>
          <Text>하이원 - 서울</Text>
          <Text>날짜: 2001-12-01</Text>
          <Text>시간: 15시</Text>
          <Text>완료</Text>
        </Grid>
      </Grid>
      <Grid>
        <Text>내가 쓴 게시글</Text>
      </Grid>
      <Grid is_flex>
        {myCarpool.map(l => {
          return(
              <Card small {...l}/>
          )
        })}
      </Grid>
    </React.Fragment>
  );
};
export default MyPage;
