import React, { useState, useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../redux/modules/profile";
import { imageActions } from "../redux/modules/image";
import { userActions } from "../redux/modules/user";

import { Grid, Image, Text, Input, Button } from "../elements/index";


const ProfileWrite = (props) => {
  const history = props.history;
  const dispatch = useDispatch();
  const preview = useSelector(state => state.image.preview);
  const basicImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBhARBxAPFRESEg0PDhAQDw8PEhUQFRYXHRUVFRMZHSggGBolHRUVITEhJTUrLi4uIx8zODMtNygtLisBCgoKDg0NGxAQFTcZHR8rLS0rKy03LTgtLS0tKzctLS0rLS83KysrOCstMCstKy0tLTctKy0tNy0rLS0rLTctK//AABEIAOAA4QMBIgACEQEDEQH/xAAaAAEAAgMBAAAAAAAAAAAAAAAABAUCAwYB/8QAMRABAAECAwUFCAIDAAAAAAAAAAECAwQRMQUhMlFxEhNBYZEiM0KBobHB0TSSFFJy/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAMCAQQF/8QAHREBAQEBAAIDAQAAAAAAAAAAAAECEQMxEiFRQf/aAAwDAQACEQMRAD8A6wB9F80AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHtNE1z7ETPSM2+nA3Kvh9ZiHOx3lRxJnAXI+H6w0XLVVv3kTHWDsOViA64AAAAAAAAAAAAAAAAAAAAAAa6LDC7OzjO/8A1/bPZ2F7NPbuazwxyjmnpa3/ACK5x/a8ooiinKiIiPJ6CagTGcbwBBxOz4rjOzunl4T+lZVTNFWVUZTGsOhRcfhe/ozp4o0845KZ3+sax+KcBVEAAAAAAAAAAAAAAAAAAbcJa77ERE6az0hqWGyKd9U9IZ1eRrM7VkAguAAAAAAp9o2u6xGcaVb/AJ+KKtNrU52YnlP3Va+b2IanKANMgAAAAAAAAAAAAAAACz2R7urrH2VifsmvK5VTPjGcfJnfpvHtZgILAAAAAAIm0/4k9aVQs9rV5W6aec5+isWx6R37AG2AAAAAAAAAAAAAAAABnZuTauxVHgwB10NFcV0RNOk74eqjAYvuZ7Nzhn6St4nONyGs8XzrsAGXQAAmco3it2hjO1HYtafFP4h2TrlvIi4y939+ZjTSOjSC8QoA64AAAAAAAAAAAAAAAAAAN+GxdVjh3xyloHLOuy8XFrH0XOKcp8/2kU1xVwzE9Jhz7xi+ONzyV0U1RTrMerRdxtu345zyjepHpPGXyJWJx1V7dTup5eM9ZRQbk4xb0AdcAAAAAAAAAAAAAAAAAABssWKr9WVuOs+ELPD4Ci1vr9qfPT0ZupGpm1WWrFd33dMz5+HqlW9mVT7yqI6b1poJ3dUmIhU7NojimqfSGcYC1yn1lKGflf1r4z8Rv8C1/rP9pYVbNonhmqPnmmB8r+nxn4rK9mTHu6onrGSLdw9drjpnrrHqvRqbrNxHOi4xGBou8O6ecfpWYjD1WKvbjd4TGik1Knc2NQDTIAAAAAAAAAAAAAAk4PCTiJzq3U8+fRjg8N/kXN/DGs/hdU0xTTlTpGjGtc+opnPft5RRFunKiMoZAiqAAAAAAAAPKqYrpyrjOOUvQFRjcFNnfb30/ZEdFMZxvU+OwvcV50cM6eU8lc679VLeefcRQFEwAAAAAAAAAB7TTNVURTrO6Hidsq12rs1T8O6OsuW8jsnasMPZixaimPnPOWwHnegAAAAAAAAAAAAY3bcXbcxVpLIBz923Nq5NNWsMVjta1uiuOk/hXPRm9iGpygDrIAAAAAAAAutn2+7wseftT81Lq6Gins0REeERCfkv0p4/b0BJUAAAAAAAAAAAAABrxNvvbFUeU5dVC6JQXqexeqjlMx9VPHU/JGACqQAAAAAAADK1vuU9Y+7oHP2fe0/9U/d0CXkV8YAmoAAAAAAAAAAAAAAKPGxli6+q8UmO/l19fwp4/bHk9NACqIAAAD//2Q==";
  const user_profile = useSelector(state => state.profile.user_profile);
  console.log(user_profile);

  const pfImgFile = useRef();
  const vImgFile = useRef();

  const emptyFile = new File([""], "empty");
  const deleteFile = new File(["delete"], "delete");

  const username = props.match.params.username;
  const is_edit = username? true: false;

  const [profile, setProfile] = useState(
    {
      nickname: user_profile.nickname,
      profileImg: emptyFile,
      gender: is_edit? user_profile.gender: '',
      ageRange: is_edit? user_profile.ageRange: '',
      career: is_edit? user_profile.career: '',
      selfIntro: is_edit? user_profile.selfIntro: '',
      phoneNum: user_profile.phoneNum,
      vacImg: emptyFile,
    }
  );
  const {
    nickname,
    profileImg,
    gender,
    ageRange,
    career,
    selfIntro,
    phoneNum,
    vacImg,
  } = profile;

  useEffect(() => {
    if(is_edit && user_profile.gender === null) {
      window.alert('프로필 정보가 없어요! 우선 프로필 등록을 해주세요!');
      history.goback();

      return null;
    }


    if(is_edit) {
      dispatch(imageActions.setPreview(user_profile.profileImg))

    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile(
      {
        ...profile,
        [name]: value,
      }
    );
  };
  
  const handleBlur = (e) => {
    const {name} = e.target;
    console.log(name)
    if(name === 'nickname') {
      console.log('성공')
      dispatch(userActions.isNicknameDB(nickname));
    };
  };

  const selectFile = () => {
    const reader = new FileReader();
    const profileImgFile = pfImgFile.current.files[0];
    const vacImgFile = vImgFile.current.files[0];


    if(profileImgFile) {
      reader.readAsDataURL(profileImgFile);

      reader.onloadend = () => {
        dispatch(imageActions.setPreview(reader.result));
      };

      setProfile(
        {
          ...profile,
          profileImg: profileImgFile,
        }
      );
    };

    if(vacImgFile) {
      setProfile(
        {
          ...profile,
          vacImg: vacImgFile,
        }
      )
    };
  };

  const addProfile = () => {
    dispatch(profileActions.addProfileDB(profile));
  };

  const editProfile = () => {
    dispatch(profileActions.editProfileDB(profile));
  };

  const deleteImg = (e) => {
    const {name} = e.target;

    if(name === 'deleteProfile') {
      setProfile(
        {
          ...profile,
          profileImg: deleteFile
        }
      );

      dispatch(imageActions.deletePreview());
    };

    if(name === 'deleteVac') {
      setProfile(
        {
          ...profile,
          vacImg: deleteFile
        }
      );
    };
  }

  return (
    <React.Fragment>
      <Grid width="70%" margin="auto">
        <Grid width="70%" margin="auto">
          <Image width="170px" height="170px" margin="auto" radius="50%" src={preview? preview: basicImage}/>
          <input type="file" onChange={selectFile} ref={pfImgFile}/>
          <Button _name='deleteProfile' _onClick={deleteImg}>사진 삭제</Button>
        </Grid>
        <Grid is_flex padding="0 24px" direction="column">
          <Grid>
            <Text marginB="5px">
              닉네임: <Input profile type="text" width="50px" _name='nickname' _value={nickname} _onBlur={handleBlur} _onChange={handleChange}/>
            </Text>
          </Grid>
          <Grid>
            <Text marginB="5px">
              성별: <Input profile type="text" width="50px" _name='gender' _value={gender} _onChange={handleChange}/>
            </Text>
          </Grid>
          <Grid>
            <Text marginB="5px">
              나이: <Input profile type="text" width="50px" _name='ageRange' _value={ageRange} _onChange={handleChange}/>
            </Text>
          </Grid>
          <Grid>
            <Text marginB="5px">
              스키 / 스노우보드 경력: <Input profile type="text" width="50px" _name='career' _value={career} _onChange={handleChange}/>
            </Text>
          </Grid>
          <Grid>
            <Text marginB="5px">
              가입 인사 한마디
              <textarea style={{width: "100%", height: "70px"}} name='selfIntro' value={selfIntro} onChange={handleChange}/>
            </Text>
          </Grid>
          <Grid>
            <Input profile label='전화번호' type="text" _disabled _name='phoneNum' _value={phoneNum} _onChange={handleChange}/>
          </Grid>
          <Grid>
            <Button _onClick={() => history.push(`/profilewrite/${username}/pwdchange`)}>비밀번호 변경</Button>
          </Grid>
          <Grid>
            백신인증: <input type="file" onChange={selectFile} ref={vImgFile}/>
            <Button _name='deleteVac' _onClick={deleteImg}>사진 삭제</Button>
          </Grid>
        </Grid>
        <Grid align="center">
          <Button width="100px" padding="7px" margin="25px auto" _onClick={is_edit? editProfile: addProfile}>
            {is_edit? '수정 완료': '작성 완료'}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileWrite;
