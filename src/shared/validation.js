// 영문, 숫자 5자리 이상, 특수 문자 사용 불가 
const idRegExp = /(?=.*[a-zA-Z])(?=.*[0-9])[^@$!%*#?&].{4,}$/;

// 특수문자 영어 숫자 포함, 최소 8자 이상
const pwdRegExp = /[A-Za-z\\d$@$!%*#?&].{8,}$/;
// /[A-Za-z\\d$@$!%*#?&].{8,}$/

// 숫자, 11자
const phoneNumExp = /(?=.*[0-9]).{11}$/;

export {idRegExp, pwdRegExp, phoneNumExp};