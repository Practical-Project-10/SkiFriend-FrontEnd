import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../redux/modules/profile";
import { userActions } from "../redux/modules/user";
import { carpoolActions } from "../redux/modules/carpool";

import SmallCard from "../components/SmallCard";

import styled from "styled-components";
import { Grid, Button, Image, Text } from "../elements/index";
import profile from "../assets/myPage/profilePicture.png"
import banner from "../assets/myPage/mypage_banner.png"

const MyPage = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
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

  return (
    //로그인 안 했을 때
    <Grid >
      <Grid phoneSize>
        {!is_login
        ? <Grid display='flex' justify='space-between' margin='30px 0 22px'>
            <Grid padding='12px 0'>
              <Text bold size='18px' line>로그인 후 이용해주세요.</Text>
            </Grid>

            <Grid padding='6px 0 0'>
              <Grid cursor width='107px' padding='5px 6px' bg='#FFF' radius='4px' align='center'
                _onClick={() => {history.push('/login')}}
              >
                <Text size='12px' color='#474D56'>로그인</Text>
              </Grid>
            </Grid>
          </Grid>
          // 로그인 했을 때
        : <Grid>
            <Grid display='flex' justify='space-between' margin='30px 0 22px'>
              <Grid width='75px' height='75px'>
                <Image
                  width='75px' height='75px' size='cover' radius='999px'
                  src={user_profile.profileImg === null? profile: user_profile.profileImg} 
                />
              </Grid>

              <Grid width='179px' padding='12px 0' margin=''>
                <Text bold size='18px' line>환영해요! {user_profile.nickname}님</Text>
                <Grid margin='10px 0 0'>
                  <Small>
                    <Text bold size='12px' color='#FFF'>20대</Text>
                  </Small>
                </Grid>
              </Grid>

              <Grid padding='6px 0 0'>
                {is_profile
                ? <Grid cursor width='66px' padding='6px' bg='#FFF' radius='4px' align='center'
                    _onClick={() => {history.push(`/profilewrite/${user_profile.username}`)}}
                  >
                    <Text size='12px' color='#474D56'>수정하기</Text>
                  </Grid>
                : <Grid  cursor width='66px' padding='6px' bg='#FFF' radius='4px' align='center'
                    _onClick={() => {history.push('/profilewrite')}}
                  >
                    <Text size='12px' color='#474D56'>등록하기</Text>
                  </Grid>
                }
              </Grid>
            </Grid>

            <div style={{border: '1px solid #adb6c1'}}></div>

            <Grid margin='22px 0 31px'>
              <Text bold='800' size='12px' margin='0 0 8px 0'>자기소개</Text>
              <Text >스키와 커피를 즐길 줄 아는 남자</Text>
            </Grid>
          </Grid>
        }
      </Grid>

      <Grid phoneSize height='483px' bg='#FFF' radius='22px 22px 0 0'>
        <Grid cursor width='100%' height='143px' margin='16px 0 26px'>
          <Image src={banner} width='100%' height='100%' size='cover'/>
          {/* 구글 폼으로 이동 */}
        </Grid>

        <Grid>
          <Text bold size='12px'>내가 쓴 카풀</Text>
          {myCarpool.map(l => {
            return(
              <Grid key={l.createdAt} width='270px'>
                <SmallCard {...l}/>
              </Grid>
            )
          })}
        </Grid>

      </Grid>

      {/* <Grid is_flex justify="space-between" borderB="1px solid #dbdbdb">
        <Grid is_flex>
          <Image myIcon />
          <Text>로그인을 해주세요</Text>
        </Grid>
        <Grid>
          <Button smallBtn _onClick={() => history.push('/login')}>로그인</Button>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

const Small = styled.div`
  width: 46px;
  height: 19px;
  background: #6195CF;
  border-radius: 140px;
  text-align: center;
  line-height: 18px;
`

export default MyPage;
