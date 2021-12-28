import React, { useState } from "react";
import { history } from "../redux/ConfigStore";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";

import { Grid, Button, Text, Input } from "../elements/index";

//react icons
import { GrFormPrevious } from "react-icons/gr";
import { AiOutlineCamera } from "react-icons/ai";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
import axios from "axios";

const FreeBoardWrite = () => {
  const params = useParams();
  const dispatch = useDispatch();

  // swiper관리
  // SwiperCore.use([Navigation, Pagination]);

  // const swiperParams = {
  //   navigation: true,
  //   pagination: true,
  // };

  // useState관리
  const [title, setTitle] = useState();
  const [content, setContet] = useState();
  const [uploadURL, setUploadURL] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);

  // 제목
  const postTitle = (e) => {
    const currentTitle = e.target.value;
    setTitle(currentTitle);
  };

  // 글 내용
  const postContent = (e) => {
    const currentContent = e.target.value;
    setContet(currentContent);
  };

  // 이미지 업로드
  const uploadImg = (e) => {
    e.preventDefault();
    setUploadFiles(e.target.files);
    const ImgUrlList = [...uploadURL];
    for (let i = 0; i < e.target.files.length; i++) {
      const ImgUrl = URL.createObjectURL(e.target.files[i]);

      ImgUrlList.push(ImgUrl);
    }
    setUploadURL(ImgUrlList);
  };

  // 데이터 전송 (완료 버튼)
  const addPostBtn = () => {
    const requestDto = { title: title, content: content };
    dispatch(
      boardActions.addBoardDB(params.skiresort, uploadFiles[0], requestDto)
    );
  };

  return (
    <React.Fragment>
      <Grid header>게시글 작성 페이지</Grid>
      <Grid is_flex justify="space-between">
        <Grid
          cursor="pointer"
          _onClick={() => {
            history.goBack();
          }}
        >
          <GrFormPrevious size="40" />
        </Grid>
        <Button smallBtn _onClick={addPostBtn}>
          완료
        </Button>
      </Grid>
      <Grid align="center">
        <Grid is_flex padding="20px">
          <Text>제목</Text>
          <Input title _onChange={postTitle}></Input>
        </Grid>
        <Input
          textarea
          placeholder="내용을 입력하세요"
          _onChange={postContent}
        />
      </Grid>
      <Grid is_flex width="100%" height="200px">
        {/* <Swiper {...swiperParams} style={{ width: "100%" }}>
          {uploadURL.length !== 0 &&
            uploadURL.map((file, index) => {
              return (
                <React.Fragment>
                  <SwiperSlide
                    style={{
                      margin: "auto",
                      position: "relative",
                    }}
                    key={index}
                  >
                    <Grid is_flex width="100%" height="200px"> */}
        <img src={uploadURL} alt="userUploadImg" />
        {/* </Grid>
                  </SwiperSlide>
                </React.Fragment>
              );
            })}
        </Swiper> */}
      </Grid>
      <Grid>
        <label htmlFor="myFile" style={{ cursor: "pointer" }}>
          <AiOutlineCamera size="25" />
        </label>
        <input
          type="file"
          id="myFile"
          style={{ display: "none" }}
          // multiple
          accept="image/*"
          onChange={uploadImg}
        />
      </Grid>
    </React.Fragment>
  );
};
export default FreeBoardWrite;
