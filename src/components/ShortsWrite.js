import React, { useState, useRef } from "react";

import { useDispatch } from "react-redux";
import { shortsActions } from "../redux/modules/shorts";

import styled from "styled-components";
import { Grid } from "../elements/index";
import video from "../assets/freeBoard/video.svg";

import ShortVideo from "./ShortsVideo";

import Header from "./Header";

const ShortsWrite = (props) => {
  const {is_edit} = props;
  const dispatch = useDispatch();

  const titleInput = useRef();
  const fileInput = useRef();
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState();

  const uploadFile = () => {
    const file_ = fileInput.current.files[0];
    const videoUrl = URL.createObjectURL(file_);
    setFile(file_);
    setSrc(videoUrl);
  };

  const addShorts = () => {
    const title = titleInput.current.value;

    if (file === null || title === '') {
      return window.alert("제목 및 영상을 등록해 주세요.");
    } else {
      dispatch(shortsActions.addShortsDB(file, titleInput.current.value));
    }
  };
  
  return (
    <React.Fragment>
      <Header goBack complete _onClick={addShorts}>
        숏츠 {is_edit ? "수정" : "작성"}하기
      </Header>
      <Grid minHeight="calc( 100vh - 55px )" bg="#FFF">
        <Grid phoneSize>
          {/* 제목작성 */}
          <Grid padding="0 0 18px">
            <Title
              maxLength="50"
              placeholder="제목을 작성해주세요.(50자 이내)"
              ref={titleInput}
              // _value={is_edit ? title : null}
              // onChange={uploadTitle}
            />
          </Grid>

          {/* 동영상미리보기 */}
          <VideoArea>
            {/* 영상을 올려주세요. */}
            <Video>
              <ShortVideo id="video" src={src} />
            </Video>
          </VideoArea>
        </Grid>

        {/* 동영상 선택 */}
        <Grid
          padding="20px 0"
          align="center"
          borderT="1px solid grey"
          cursor="pointer"
          hoverOpacity="0.8"
        >
          <label htmlFor="myFile" style={{ cursor: "pointer" }}>
            <img src={video} alt="동영상 선택" />
          </label>
          <input
            type="file"
            id="myFile"
            multiple
            style={{ display: "none" }}
            ref={fileInput}
            onChange={uploadFile}
            // accept="video/*"
          />
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
