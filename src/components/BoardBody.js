import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { boardCreators as boardActions } from "../redux/modules/freeboard";
import { imageActions } from "../redux/modules/image";

import styled from "styled-components";
import { Grid, Text, Input, Image } from "../elements/index";
import UnderArrow from "../assets/freeBoard/underArrow.svg";

import Header from "../components/Header";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
//react icons
import { AiOutlineCamera } from "react-icons/ai";

const BoardBody = (props) => {
  const dispatch = useDispatch();
  // 주소 경로값
  const params = useParams();
  const skiresort = params.skiresort;
  const postId = params.postId;
  // 작성 수정 판단 여부
  const is_edit = postId ? true : false;
  // redux데이터
  const postData = useSelector((state) => state.freeboard.detail);
  const leftList = postData.photoList;
  // useState관리
  const [title, setTitle] = useState(postData ? postData.title : "");
  const [content, setContet] = useState(postData ? postData.content : "");
  const [photoList, setPhotoList] = useState([]);
  const [deletePhotoList, setDeletePhotoList] = useState([]);
  const [uploadURL, setUploadURL] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);
  // swiper관리
  SwiperCore.use([Navigation, Pagination]);
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

  //미리보기 사진저장
  useEffect(() => {
    if (is_edit) {
      return dispatch(boardActions.getOneBoardDB(postId));
    }
  }, []);

  // 이미지 업로드
  const uploadImg = (e) => {
    e.preventDefault();
    setUploadFiles(e.target.files);
    const ImgUrlList = [...uploadURL];
    const Photobook = [...photoList];
    for (let i = 0; i < e.target.files.length; i++) {
      const ImgUrl = URL.createObjectURL(e.target.files[i]);
      ImgUrlList.push(ImgUrl);
      Photobook.push(i + 1);
    }
    dispatch(imageActions.setPreview(ImgUrlList));
    setUploadURL(ImgUrlList);
    setPhotoList(Photobook);
  };

  // 데이터 전송 (완료 버튼)
  const addPostBtn = () => {
    const requestDto = { title: title, content: content, photoList: photoList };
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
            _value={is_edit ? title : null}
            placeholder="제목을 작성해주세요."
            _onChange={postTitle}
          />
          {props.page === "video"
          ? null
          : //내용작성
            <Content
              placeholder="내용을 입력하세요"
              value={is_edit ? content : null}
              onChange={postContent}
            ></Content>
          }
          
        </Grid>
        
        {props.page === "video"
        ? //동영상미리보기
          <Grid>
            
          </Grid>
        : //사진미리보기
          <Grid is_flex width="100%" height="280px" padding="0 16px 5px">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              style={{ width: "100%" }}
            >
              {leftList !== undefined &&
                leftList.map((photo, index) => {
                  return (
                    <SwiperSlide key={photo + index}>
                      <DeletePic onClick={() => deleteImg(photo.photoId)}>
                        X
                      </DeletePic>
                      <EditImage className="leftList">
                        <img
                          id={photo.photoId}
                          className="leftList"
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
        }
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

export default BoardBody;