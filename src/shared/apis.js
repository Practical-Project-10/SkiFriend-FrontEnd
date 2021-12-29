import axios from "axios";
import { getCookie } from "./cookie";

const api = axios.create({
  baseURL: "http://13.125.249.172/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

const apiMultipart = axios.create({
  baseURL: "http://13.125.249.172/",
  headers: {
    "content-type":
      "multipart/form-data; boundary=----WebKitFormBoundarymqOgr6Cp7jHF3SAA",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

apiMultipart.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  console.log(config);
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  //로그인 / 회원가입
  login: (id, pwd) =>
    api.post("/user/login", {
      username: id,
      password: pwd,
    }),

  signup: (userInfo) => {
    console.log(userInfo);
    api.post("/user/signup", {
      username: userInfo.username,
      password: userInfo.password,
      phoneNum: userInfo.phoneNum,
      nickname: userInfo.nickname,
    });
  },

  idCheck: (id) => api.post("/user/signup/idcheck", { username: id }),

  nicknameCheck: (nickname) =>
    api.post("/user/signup/nicknamecheck", { nickname }),

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
    api.post("/user/profile", profile, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }),

  editProfile: (profile) =>
    api.put("/user/info", profile, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }),

  //비밀번호 변경
  changePwd: (password, newPassword) => 
    api.put('/user/info/password', {
      password,
      newPassword,
    }),

  //회원탈퇴
  deleteUser: () => api.delete("/user/info"),

  //카풀 게시글
  getCarpool: (skiResort) =>
    api.get(`/board/carpool/${skiResort}?size=10&page=1`),

  addCarpool: (skiResort, carpool) =>
    api.post(`/board/carpool/${skiResort}`, {
      carpoolType: carpool.carpoolType,
      startLocation: carpool.startLocation,
      endLocation: carpool.endLocation,
      date: carpool.date,
      time: carpool.time,
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
      price: carpool.price,
      memberNum: carpool.memberNum,
      notice: carpool.notice,
    }),

  deleteCarpool: (carpoolId) => api.delete(`/board/carpool/${carpoolId}`),

  // 자유게시글
  getFreePost: (skiResort) =>
    api.get(`/board/freeBoard/${skiResort}?size=10&page=1`, {}),
  writeFreePost: (skiResort, datas) =>
    apiMultipart.post(`/board/${skiResort}/freeBoard`, { datas }),
  getOneFreePost: (postId) => api.get(`board/freeBoard/${postId}/detail`, {}),
  updateFreePost: (postId, datas) =>
    api.put(`board/freeBoard/${postId}`, { datas }),
  deleteFreePost: (postId) => api.delete(`/board/freeBoard/${postId}`, {}),

  // //댓글
  addPostComment: (postId, content) =>
    api.post(`/board/freeBoard/${postId}/comments`, { content }),
  updatePostComment: (commentId, content) =>
    api.put(`/board/freeBoard/comments/${commentId}`, { content }),
  deletePostComment: (commentId) =>
    api.delete(`/board/freeBoard/comments/${commentId}`, {}),

  //좋아요
  changeLike: (postId) => api.post(`/board/freeBoard/${postId}/likes`, {}),
};

// export const apisMultipart = {
//   addPost: (formdata) => apiMultipart.post("/posts", { formdata }),
// };
