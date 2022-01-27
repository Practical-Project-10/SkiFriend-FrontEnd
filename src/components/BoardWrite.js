import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";

import styled from "styled-components";
import { Grid, Text, Input, Image } from "../elements/index";
import UnderArrow from "../assets/freeBoard/underArrow.svg";
import { AiOutlineCamera } from "react-icons/ai";

import Header from "./Header";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

const BoardWrite = (props) => {
  const { is_edit, skiresort, postId } = props;
  const dispatch = useDispatch();
  // redux데이터
  const postData = useSelector((state) => state.freeboard.detail);
  const leftList = postData.photoList;
  // swiper관리
  SwiperCore.use([Navigation, Pagination]);

  // useState관리
  const [title, setTitle] = useState(is_edit ? postData.title : "");
  const [content, setContet] = useState(is_edit ? postData.content : "");
  const [photoId, setPhotoId] = useState([]);
  const [deletePhotoList, setDeletePhotoList] = useState([]);
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

  useEffect(() => {
    if (is_edit) {
      //상세보기 데이터 가져오기
      return dispatch(boardActions.getOneBoardDB(postId));
    }
  }, []);

  // 이미지 업로드
  const uploadImg = (e) => {
    setUploadFiles(e.target.files);
    const ImgUrlList = [...uploadURL];
    const Photobook = [...photoId];
    for (let i = 0; i < e.target.files.length; i++) {
      const ImgUrl = URL.createObjectURL(e.target.files[i]);
      ImgUrlList.push(ImgUrl);
      Photobook.push(i + 1);
    }
    setUploadURL(ImgUrlList); //자신이 고른 사진 화면에 보여주기 위해
    setPhotoId(Photobook); //사진번호 넘겨주기 위해
  };

  // 데이터 전송
  const addPostBtn = () => {
    const requestDto = { title: title, content: content, photoList: photoId };
    const ask = window.confirm("게시물을 등록하시겠습니까?");
    if (ask) {
      return dispatch(
        boardActions.addBoardDB(skiresort, uploadFiles, requestDto)
      );
    } else {
      return;
    }
  };

  // 데이터 수정
  const editPostBtn = () => {
    const requestDto = {
      title: title,
      content: content,
      photoIdList: deletePhotoList,
    };
    const ask = window.confirm("게시물을 등록하시겠습니까?");
    if (ask) {
      return dispatch(
        boardActions.updateBoardDB(skiresort, postId, uploadFiles, requestDto)
      );
    } else {
      return;
    }
  };

  //수정 이미지 삭제
  const deleteImg = (deleteIdx) => {
    let element = document.getElementById(deleteIdx);
    const deleteList = [...deletePhotoList];
    deleteList.push(deleteIdx);
    setDeletePhotoList(deleteList);
    for (let i = 0; i < leftList.length; i++) {
      if (leftList[i].photoId === deleteIdx) {
        element.classList.add("edit");
      }
    }
  };

  return (
    <React.Fragment>
      <Header goBack complete _onClick={is_edit ? editPostBtn : addPostBtn}>
        게시글 {is_edit ? "수정" : "작성"}하기
      </Header>
      <Grid minHeight="calc( 100vh - 55px )" bg="#FFF">
        <Grid is_flex justify="space-between" bg="#C6D2E0" padding="8px 16px">
          <Text>작성 전 꼭 읽어주세요!</Text>
          <Image src={UnderArrow} width="13px" height="8px" />
        </Grid>
        <Grid phoneSize height="330px">
          {/* 제목작성 */}
          <Input
            title
            _maxLength="50"
            _value={title}
            placeholder="제목을 작성해주세요.(50자 이내)"
            _onChange={postTitle}
          />
          {/* 내용작성 */}
          <Content
            placeholder="내용을 입력하세요(200자 이내)"
            maxLength="200"
            value={content}
            onChange={postContent}
          ></Content>
        </Grid>
        {/*사진미리보기 */}
        <Grid is_flex width="100%" height="280px" padding="0 16px 5px">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            style={{ width: "100%" }}
          >
            {/* 수정페이지 */}
            {is_edit &&
              leftList !== undefined &&
              leftList.map((photo, index) => {
                return (
                  <SwiperSlide key={photo + index}>
                    <DeletePic onClick={() => deleteImg(photo.photoId)}>
                      X
                    </DeletePic>
                    <EditImage>
                      <img
                        id={photo.photoId}
                        src={photo.photoUrl}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                        alt="userUploadImg"
                      />
                    </EditImage>
                  </SwiperSlide>
                );
              })}
            {/* 작성페이지 */}
            {uploadURL.length !== 0 &&
              uploadURL.map((file, index) => {
                return (
                  <SwiperSlide key={file + index}>
                    <img
                      src={file}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      alt="userUploadImg"
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </Grid>
        {/* 이미지 */}
        <Grid
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
            multiple
            style={{ display: "none" }}
            accept="image/*"
            onChange={uploadImg}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const Content = styled.textarea`
  width: 100%;
  height: 380px;
  padding: 22px 0;
  border: none;
  outline: none;
  resize: none;
`;

const DeletePic = styled.div`
  width: 18px;
  height: 18px;
  color: #fff;
  text-align: center;
  border-radius: 999px;
  background: #a6a9ad;
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;
  &:hover {
    background: red;
  }
`;

const EditImage = styled.div`
  .edit {
    opacity: 0.2;
  }
`;

export default BoardWrite;
