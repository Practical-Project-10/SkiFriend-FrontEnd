import axios from "axios";

const api = axios.create({
  baseURL: "http://3.34.19.50:8080/", //https://seongeunyang.shop/   http://3.34.19.50:8080/
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  //전화번호
  phoneNumCheck: (phoneNumber) =>
    api.post("/user/sms", { phoneNumber: phoneNumber }),

  smsNumCheck: (phoneNumber, randomNumber) =>
    api.post("/user/sms/check", {
      phoneNumber,
      randomNumber,
    }),

  //마이페이지
  getProfile: () => api.get("/user/info"),

  addProfile: (profile) =>
    api.put("/user/info", profile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  //비밀번호 변경
  changePwd: (password, newPassword) =>
    api.put("/user/info/password", {
      password,
      newPassword,
    }),

  //회원탈퇴
  deleteUser: () => api.delete("/user/info"),

  //카풀
  imageResort: (skiResort) => api.get(`/board/carpool/${skiResort}/banner`),

  getCarpool: (skiResort, page) =>
    api.get(`/board/carpool/${skiResort}`, {
      params: { page: page, size: 4 },
    }),

  addCarpool: (skiResort, carpool) =>
    api.post(`/board/carpool/${skiResort}`, {
      carpoolType: carpool.carpoolType,
      startLocation: carpool.startLocation,
      endLocation: carpool.endLocation,
      date: carpool.date,
      time: carpool.time,
      title: carpool.title,
      price: carpool.price,
      memberNum: carpool.memberNum,
      notice: carpool.notice,
    }),

  editCarpool: (carpoolId, carpool) =>
    api.put(`/board/carpool/${carpoolId}`, {
      carpoolType: carpool.carpoolType,
      startLocation: carpool.startLocation,
      endLocation: carpool.endLocation,
      date: carpool.date,
      time: carpool.time,
      title: carpool.title,
      price: carpool.price,
      memberNum: carpool.memberNum,
      notice: carpool.notice,
    }),

  deleteCarpool: (carpoolId) => api.delete(`/board/carpool/${carpoolId}`),

  getMyCarpool: () => api.get("/user/info/carpool"),

  completeCarpool: (carpoolId) =>
    api.post(`/board/carpool/${carpoolId}/status`),

  filterCarpool: (skiResort, datas) =>
    api.post(`/board/carpool/${skiResort}/category`, datas),

  // 메인페이지 HOT게시물
  hotPost: api.get("/main"),

  // 자유게시글
  getFreePost: (skiResort, page) =>
    api.get(`/board/freeBoard/${skiResort}?size=10&page=1`, {
      // params: {page: page, size: 17}
    }),

  writeFreePost: (skiResort, datas) =>
    api.post(`/board/${skiResort}/freeBoard`, datas, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  getOneFreePost: (postId) => api.get(`board/freeBoard/${postId}/detail`, {}),

  updateFreePost: (postId, datas) =>
    api.put(`board/freeBoard/${postId}`, datas, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  deleteFreePost: (postId) => api.delete(`/board/freeBoard/${postId}`, {}),

  //댓글
  addPostComment: (postId, content) =>
    api.post(`/board/freeBoard/${postId}/comments`, { content }),

  updatePostComment: (commentId, content) =>
    api.put(`/board/freeBoard/comments/${commentId}`, { content }),

  deletePostComment: (commentId) =>
    api.delete(`/board/freeBoard/comments/${commentId}`, {}),

  //좋아요
  changeLike: (postId) => api.post(`/board/freeBoard/${postId}/likes`, {}),

  //채팅
  chatRoom: (postId) => api.post(`/chat/room/${postId}`, {}),

  chatRoomList: () => api.get(`/chat/rooms`, {}),

  chatMSG: (roomId) => api.get(`/chat/message/${roomId}`),

  chatShowProfile: (roomId) => api.get(`/user/introduction/${roomId}`),

  chatPhoneNum: () => api.get(`/user/info/phoneNum`),

  chatRoomInfo: (roomId) => api.get(`/chat/room/${roomId}/carpool`),

  chatRoomDelete: (roomId) => api.delete(`/chat/room/${roomId}`),

  //동영상
  shortsRandomList: () => api.get(`/shorts`),

  shortsUpload: (videoFile, title) =>
    api.post(
      `/shorts`,
      { videoFile, title },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),

  shortsUpdate: (videoId, title) => api.put(`/shorts/${videoId}`, { title }),

  shortsDelete: (videoId) => api.delete(`/shorts/${videoId}`),

  //동영상 좋아요
  shortsLike: (videoId) => api.post(`/shorts/${videoId}/like`),

  //동영상 댓글
  shortsListComment: (videoId) => api.get(`/shorts/${videoId}/comments`),

  shortsWriteComment: (videoId, content) =>
    api.post(`/shorts/${videoId}/comments`, content),

  shortsUpdateComment: (videoCommentId, content) =>
    api.put(`/shorts/comments/${videoCommentId}`, content),

  shortsDeleteComment: (videoCommentId) =>
    api.delete(`/shorts/comments/${videoCommentId}`),

  //내가 작성한 동영상 목록
  myShortsList: () => api.get(`/user/info/shorts`),
};
