import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { Grid, Text, Input } from "../elements/index";
import video from "../assets/freeBoard/video.svg"

import Header from "./Header";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

const VideoUpload = (props) => {
  const {is_edit, skiresort, postId} = props;
  const dispatch = useDispatch();
  
  return (
    <React.Fragment>
      <Header goBack complete>
        숏츠 {is_edit ? "수정" : "작성"}하기
      </Header>
      <Grid minHeight="calc( 100vh - 55px )" bg="#FFF">
        <Grid phoneSize>
          {/* 제목작성 */}
          <Grid padding='0 0 18px'>
            <Input
              title
              _maxLength="50"
              placeholder="제목을 작성해주세요.(50자 이내)"
              // _value={is_edit ? title : null}
              // _onChange={postTitle}
            />
          </Grid>

          {/* 동영상미리보기 */}
          <Grid phoneSize is_flex justify='center' width="100%" height="542px" margin='0 0 5px' bg='#EAEAEA'>
            <Text size='20px' color='#b7b8bc'>영상을 올려주세요.</Text>
            {/* <Swiper
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              style={{ width: "100%" }}
            >
              
            </Swiper> */}
          </Grid>
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
            <img src={video} alt='동영상 선택'/>
          </label>
          <input
            type="file"
            id="myFile"
            multiple
            style={{ display: "none" }}
            accept="image/*"
            // onChange={uploadImg}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default VideoUpload;