import React from "react";
import { Grid, Button, Image, Text } from "../elements/index";

const MyPage = () => {
  const is_login = 1;
  console.log(is_login)
  if (!is_login) {
    return (
      //로그인 안한 경우
      <React.Fragment>
        <Grid bg="yellow">
          <Grid header> 마이페이지</Grid>
          <Grid align="end">
            <Button smallBtn>로그아웃</Button>
          </Grid>
          <Grid is_flex justify="space-between" borderB="1px solid #dbdbdb">
            <Grid is_flex>
              <Image myIcon />
              <Text>로그인을 해주세요</Text>
            </Grid>
            <Grid>
              <Button smallBtn>회원가입</Button>
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
            <Image myIcon />
            <Text>환영해요 ...님</Text>
          </Grid>
          <Grid>
            <Button smallBtn>정보수정</Button>
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
