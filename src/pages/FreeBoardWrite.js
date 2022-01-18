import React from "react";
import BoardBody from "../components/BoardBody";

const FreeBoardWrite = (props) => {
  
  return (
    <React.Fragment>
      <BoardBody/>
    ------------------------------------
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
            _value={is_edit ? title : null}
            placeholder="제목을 작성해주세요.(50자 이내)"
            _onChange={postTitle}
          />
          {/* 내용작성 */}
          <Content
            placeholder="내용을 입력하세요(200자 이내)"
            maxLength="200"
            value={is_edit ? content : null}
            onChange={postContent}
          ></Content>
        </Grid>
        {/* 사진미리보기 */}
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

export default FreeBoardWrite;
