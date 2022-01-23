import React, { useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { shortsActions } from "../redux/modules/shorts";

import styled from "styled-components";
import { Grid, Text } from "../elements/index";
import video_ from "../assets/freeBoard/video.svg";

import ShortVideo from "./ShortsVideo";

import Header from "./Header";

const ShortsWrite = (props) => {
  const {is_edit, shortsId} = props;
  const dispatch = useDispatch();
  //redux데이터
  const myShortsList = useSelector(state => state.shorts.myShortsList);
  const shorts = is_edit? myShortsList.find(s => s.shortsId === Number(shortsId)): null;

  // const titleInput = useRef(shorts? shorts.title: '');
  const fileInput = useRef();
  // const [file, setFile] = useState(null);
  const [src, setSrc] = useState(shorts? shorts.videoPath: '');
  const [form, setForm] = useState(
    {
      title: shorts? shorts.title: '',
      video: shorts? shorts.videoPath: null,
    }
  );
  const {title, video} = form;

  const handleChange = (e) => {
    const {name, value} = e.target;

    setForm(
      {
        ...form,
        [name]: value,
      }
    );
  }

  // 파일 업로드
  const uploadFile = () => {
    const file_ = fileInput.current.files[0];
    const videoUrl = URL.createObjectURL(file_);
    setSrc(videoUrl);
    setForm(
      {
        ...form,
        video: file_,
      }
    );
  };

  //숏츠 업로드
  const addShorts = () => {
    // const title = titleInput.current.value;

    if (video === null || title === '') {
      return window.alert("제목 및 영상을 등록해 주세요.");
    } else {
      dispatch(shortsActions.addShortsDB(video, title));
    }
  };

  //숏츠 수정
  const updateShorts = () => {
    // const title = titleInput.current.value;
    
    if (video === null || title === '') {
      return window.alert("제목 및 영상을 등록해 주세요.");
    } else {
      dispatch(shortsActions.updateShortsDB(shortsId, title));
    }
  };
  
  return (
    <React.Fragment>
      <Header goBack complete _onClick={is_edit? updateShorts: addShorts}>
        숏츠 {is_edit? "수정" : "작성"}하기
      </Header>
      <Grid minHeight="calc( 100vh - 55px )" bg="#FFF">
        <Grid phoneSize>
          {/* 제목작성 */}
          <Grid padding="0 0 18px">
            <Title
              maxLength="12"
              placeholder="제목을 작성해주세요.(12자 이내)"
              name='title'
              value={title}
              onChange={handleChange}
              // ref={titleInput}
            />
          </Grid>

          {/* 동영상미리보기 */}
          <VideoArea>
            {/* 영상을 올려주세요. */}
            <Video>
              <ShortVideo page='write' src={src} />
            </Video>
          </VideoArea>
        </Grid>

        {/* 동영상 선택 */}
        <Grid
          padding="20px 0"
          align="center"
          borderT="1px solid grey"
        >
          {is_edit
          ? <Grid>
              <Text color='rgba(0,0,0,0.5)'>동영상은 수정할 수 없습니다.</Text>
            </Grid>
          : <React.Fragment>
              <label htmlFor="myFile" style={{ cursor: "pointer", opacity: '0.8' }}>
                <img src={video_} alt="동영상 선택" />
              </label>
              <input
                type="file"
                id="myFile"
                multiple
                style={{ display: "none" }}
                ref={fileInput}
                onChange={uploadFile}
                accept="video/*"
              />
            </React.Fragment>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const VideoArea = styled.div`
  width: 100%;
  height: 542px;
  padding: 0 16px;
  margin: "0 0 5px";
  background-color: #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #b7b8bc;

  position: relative;
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

const Video = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export default ShortsWrite;
