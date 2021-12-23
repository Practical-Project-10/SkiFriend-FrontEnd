import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// const apiMultipart = axios.create({
//   baseURL: "",
//   headers: {
//     "content-type":
//       "multipart/form-data; boundary=----WebKitFormBoundaryfApYSlK1ODwmeKW3",
//   },
// });
//

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

// apiMultipart.interceptors.request.use(function (config) {
//   const accessToken = document.cookie.split("=")[1];
//   config.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   return config;
// });

export const apis = {
  //로그인 / 회원가입
  // sms인증 api 찾아보기
  login: (id, pwd) =>
    api.post('/user/login', {
      username: id,
      password: pwd,
    }),
  
  signup: (userInfo) =>
    api.post('/user/signup', {
      username: userInfo.username,
      password: userInfo.password,
      phoneNum: userInfo.phoneNum,
      nickname: userInfo.nickname,
      profileImg: userInfo.profileImg,
      vacImg: userInfo.vacImg,
      gender: userInfo.gender,
      ageRange: userInfo.ageRange,
      career: userInfo.career,
      selfInfro: userInfo.selfInfro,
    }),

  idCheck: (id) => 
    api.post('/user/signup/idcheck', {
      username: id,
    }),

  nicknameCheck: (nickname) =>
    api.post('/user/signup/nicknamecheck', {
      nickname
    }),

  getUserInfo: () =>
    api.get('/user/info'),

  editUserInfo: (userInfo) => // 비밀번호 예외 처리
    api.put('/user/info', {
      password: userInfo.password,
      nickname: userInfo.nickname,
      profileImg: userInfo.profileImg,
      vacImg: userInfo.vacImg,
      career: userInfo.career,
      selfIntro: userInfo.selfInfro,
    }),


  //마이페이지  
  deleteUser: () => 
    api.delete('/user/info'),
  
  
  

  //카풀게시글/ 자유게시글
  getPost: (skiResort) => api.get(`/board/${skiResort}`, {}),
  writeFreePost: (skiResort, token, datas) =>
    api.post(`/board/${skiResort}/freeBoard`, { token, datas }),
  getOneFreePost: (postId) => api.post(`board/freeBoard/${postId}`, {}),
  updateFreePost: (postId, token, datas) =>
    api.put(`board/freeBoard/${postId}`, { token, datas }),
  deleteFreePost: (postId, token) => api.delete(`/posts/${postId}`, { token }),

  // //댓글
  addComment: (postId, token, content) =>
    api.post(`/board/freeBoard/${postId}/comments`, { token, content }),
  updateComment: (commentId, token, content) =>
    api.put(`/board/freeBoard/comments/${commentId}`, { token, content }),
  deleteComment: (commentId, token) =>
    api.delete(`/board/freeBoard/comments/${commentId}`, { token }),

  //좋아요
  changeLike: (postId, token) =>
    api.post(`/board/freeBoard/${postId}/likes`, { token }),
};

// export const apisMultipart = {
//   addPost: (formdata) => apiMultipart.post("/posts", { formdata }),
// };