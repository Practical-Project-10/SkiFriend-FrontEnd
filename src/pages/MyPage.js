
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { ProfilieActions } from "../redux/modules/profile";
import { userActions } from "../redux/modules/user";

import { Grid, Button, Image, Text } from "../elements/index";

const MyPage = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const is_login = localStorage.getItem('is_login');
  const is_profile = localStorage.getItem('is_profile');
  const user_profile = useSelector(state => state.profile.user_profile);

  React.useEffect(() => {
    dispatch(ProfilieActions.getProfileDB());
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
            <Image myIcon src={user_profile.profileImg}/>
            <Text>{user_profile.nickname}</Text>
          </Grid>
          <Grid>
            {is_profile
              ? <Button smallBtn _onClick={() => {history.push(`/myprofile/${user_profile.username}`)}}>프로필 수정</Button>
              : <Button smallBtn _onClick={() => {history.push('/myprofile')}}>등록하기</Button>
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
      <Grid>
        <Text>...</Text>
        <Text>...</Text>
        <Text>...</Text>
      </Grid>
    </React.Fragment>
  );
};
export default MyPage;
