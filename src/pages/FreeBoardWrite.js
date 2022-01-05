import React, { useState } from "react";

import { history } from "../redux/ConfigStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";
import { imageActions } from "../redux/modules/image";

import { Grid, Button, Text, Input, Image } from "../elements/index";
import UnderArrow from "../assets/freeBoard/underArrow.svg";

import Header from "../components/Header";

//react icons
import { AiOutlineCamera } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";

const FreeBoardWrite = () => {
  const dispatch = useDispatch();
  const emptyFile = new File([""], "empty");

  // 주소 경로값
  const params = useParams();
  const skiresort = params.skiresort;
  const postId = params.postId;

  // 작성 수정 판단 여부
  const is_edit = postId ? true : false;

  // redux데이터
  const postData = useSelector((state) => state.freeboard.detail);
  const preview = useSelector((state) => state.image.preview);

  // useState관리
  const [title, setTitle] = useState(postData ? postData.title : "");
  const [content, setContet] = useState(postData ? postData.content : "");
  const [uploadURL, setUploadURL] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(emptyFile);

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
    setUploadFiles(e.target.files[0]);
    const ImgUrlList = [...uploadURL];
    for (let i = 0; i < e.target.files.length; i++) {
      const ImgUrl = URL.createObjectURL(e.target.files[i]);
      ImgUrlList.push(ImgUrl);
    }

    dispatch(imageActions.setPreview(ImgUrlList));
    setUploadURL(ImgUrlList);
  };

  // 데이터 전송 (완료 버튼)
  const addPostBtn = () => {
    const requestDto = { title: title, content: content };
    const ask = window.confirm("게시물을 등록하시겠습니까?");
    if (ask) {
      return dispatch(
        boardActions.addBoardDB(skiresort, uploadFiles, requestDto)
      );
    } else {
      return;
    }
  };

  // 데이터 수정 (완료 버튼)
  const editPostBtn = () => {
    const requestDto = { title: title, content: content };
    console.log(requestDto);
    const ask = window.confirm("게시물을 등록하시겠습니까?");
    if (ask) {
      return dispatch(
        boardActions.updateBoardDB(skiresort, postId, uploadFiles, requestDto)
      );
    } else {
      return;
    }
  };

  React.useEffect(() => {
    if (is_edit) {
      dispatch(imageActions.setPreview(postData.image));
    }
  }, []);

  return (
    <React.Fragment>
      <Header goBack>게시글 {is_edit? "수정": "수정"}하기</Header>
      <Grid minHeight='calc( 100vh - 55px )' bg="#FFF">
        <Grid is_flex justify="space-between" bg="#C6D2E0" padding="8px 16px">
          <Text>작성 전 꼭 읽어주세요!</Text>
          <Image src={UnderArrow} width="13px" height="8px" />
        </Grid>

        <Grid phoneSize height="705px">
          {/* 제목작성 */}
          {is_edit ? (
            <Input
              title
              _value={title}
              placeholder="제목을 작성해주세요."
              _onChange={postTitle}
            />
          ) : (
            <Input
              title
              placeholder="제목을 작성해주세요."
              _onChange={postTitle}
            />
          )}
          {/* 내용작성 */}
          {is_edit ? (
            <Input
              textarea
              _value={content}
              placeholder="내용을 입력하세요"
              _onChange={postContent}
            />
          ) : (
            <Input
              textarea
              placeholder="내용을 입력하세요"
              _onChange={postContent}
            />
          )}
          {/* 사진미리보기 */}
          <Grid is_flex width="100%" height="200px">
            {is_edit ? (
              <Image src={preview ? preview : ""} width="100%" height="100%" />
            ) : (
              <Image src={uploadURL} width="100%" height="100%" />
            )}
          </Grid>
          <Grid
            margin="20px auto"
            padding="20px 0"
            align="center"
            borderT="1px solid grey"
            cursor="pointer"
            hoverOpacity="0.8"
          >
            <label htmlFor="myFile" style={{ cursor: "pointer" }}>
              <AiOutlineCamera size="25" />
            </label>
            <input
              type="file"
              id="myFile"
              style={{ display: "none" }}
              accept="image/*"
              onChange={uploadImg}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FreeBoardWrite;
