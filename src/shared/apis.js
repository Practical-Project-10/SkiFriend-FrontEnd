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
  //로그인, 회원가입
  signup: (id, fullname, username, pwd) =>
    api.post("/auth/signup", {
      email: id,
      fullname: fullname,
      username: username,
      password: pwd,
    }),
  login: (id, pwd) => api.post("/auth/login", { email: id, password: pwd }),

  //카풀게시글/ 자유게시글
  getPost: (skiResort) => api.get(`/board/${skiResort}`, {}),
  writeFreePost: (skiResort, token, fd) =>
    api.post(`/board/${skiResort}/freeBoard`, { token, fd }),
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
