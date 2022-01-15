// 영문, 숫자 5자리 이상, 특수 문자 사용 불가 
const idRegExp = /(?=.*[a-zA-Z])(?=.*[0-9])[^@$!%*#?&].{4,}$/;

// 영소문자와 숫자 반드시 포함, 특수 문자 사용 불가, 최소 8자 이상이어야 합니다.
const pwdRegExp = /(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/;
// /[A-Za-z\\d$@$!%*#?&].{8,}$/

// 숫자, 11자
const phoneNumExp = /(?=.*[0-9]).{11}$/;

export {idRegExp, pwdRegExp, phoneNumExp};