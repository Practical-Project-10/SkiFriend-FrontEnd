export const userStorage = (userInfo) => {
  localStorage.setItem("certification", userInfo.certification);
  localStorage.setItem("nickname", userInfo.nickname);
  localStorage.setItem("profileImg", userInfo.profileImg);
  localStorage.setItem("gender", userInfo.gender);
  localStorage.setItem("ageRange", userInfo.ageRange);
  localStorage.setItem("career", userInfo.career);
  localStorage.setItem("selfIntro", userInfo.selfIntro);
  localStorage.setItem("phoneNum", userInfo.phoneNum);
};
