<h2>스키인들을 위한 카풀 서비스</h2>

<br/>

<img width="100%" src="https://skifriend.shop/static/media/Home_banner.255a018411020b126d65.png" alt="skifriend">

<br/>

[사이트 링크 바로가기](https://skifriend.shop/)

<br/>

# 목차

- 목차
  - [프로젝트 소개](#프로젝트-소개)
  - [프로젝트 기간](#프로젝트-기간)
  - [팀원](#팀원)
  - [프로젝트 아키텍처](#프로젝트-아키텍처)
  - [유저 피드백 및 개선사항](#유저-피드백-및-개선사항)
  - [페이지 구성](#페이지-구성)
  - [역할 분담](#역할-분담)

<br/>

## 프로젝트 소개

- 스키장 카풀을 요청, 제공 하고 더 나아가 스키장을 이용하는 사람들을 위한 커뮤니티 서비스

## 프로젝트 기간

- 21.12.18(토) - 22.01.28(금)

## 팀원

- Frontend(React) : [박재우](https://github.com/Jay1025), [정민수]()
- Backend(Spring) : 이현범(팀장), 양성은, 최석영
- Designer : 권순권, 김신

<br/>

- [노션 정보](https://power-bowler-c76.notion.site/8-13-10-0c3ad4dd39b34a2b8501e8bac3c63d19)
- [시연 영상](https://www.youtube.com/watch?v=-xYttQl9TqA&feature=youtu.be&ab_channel=%EC%96%91%EC%84%B1%EC%9D%80)

<br/>

## 프로젝트 아키텍처

<img width="1183" alt="프론트엔드 아키텍처" src="https://user-images.githubusercontent.com/83019343/151115330-df6227ee-baae-4052-98da-d99b4bcc7045.png">

<br/>

## 🛠 기술 스텍 및 라이브러리
- 주요언어: Javascript
- 주요 라이브러리: React
- 상태관리
  - redux
  - redux-thunk
  - redux-logger
  - immer
- 배포
  - github actions
  - aws s3(서비스 배포)
  - aws cloudfront(Https 적용)
- 통신
  - axios
  - sockJS
- 스타일
  - styled-component
- PWA
- Git Actions
- 라이브러리 & 패키지
  - react-datepicker
  - react-swiper
  - react-slick

<br/>

## **페이지 구성📖**

- 메인
- 로그인
- 마이페이지/프로필 수정
- 카풀 게시글/작성/수정/필터
- 자유 게시판/상세/작성/수정
- 스키장 안내
- 숏츠 게시판/작성
- 채팅 목록/방

<br/>

## 역할 분담

- 정민수
  - 카카오 소셜 로그인[카카오 api 활용]
  - 스키장 별 페이지 진입
   
  Axios 및 Redux를 활용한 CRUD작업
  - 카풀 게시글 (게시글 CRUD, 모집완료, 필터)
  - 숏츠 게시글 (동영상 CRUD)
  - 마이페이지(사용자가 작성한 카풀/숏츠 게시글 모아보기[react-swiper] 활용, 회원탈퇴, 프로필 수정)

  - Git Actions 활용한 CI/CD
        
- 박재우

  Axios 및 Redux를 활용한 CRUD작업
  - 자유게시판(게시물CRUD, 댓글CRUD, 좋아요, 사진다중전송[react-swiper활용])
  - 쇼츠(댓글, 좋아요)
  - 핫게시물
  - 배너캐러셀[react-slick활용]

  Socket을 활용한 채팅기능 구현
  - 채팅(SockJS, Stomp, 채팅방 전화번호/ 프로필 공개, 채팅방 나가기, 안읽음 메세지 표시)

  모바일 최적화를 위해 PWA적용
  - PWA(Cloud Front, Route53, S3 - https배포)

<br/>

## 유저 피드백 및 개선사항

<b>(1) 가입 절차가 너무 많아요<b/>
  - 전: 서비스를 이용하기 위한 가입 절차는 번호인증 => 회원가입 => 프로필 필수항목 작성으로 번거로웠습니다.
  ![로그인 개선 전](https://user-images.githubusercontent.com/83019343/151125943-741fa37f-bfcf-4c83-a57f-d354cb169b4a.PNG)

  <br/>

  - 후: 소셜 로그인으로 필요한 사용자 정보만 받아와 전화번호 인증만하면 서비스를 이용할 수 있습니다.
  ![로그인 개선 후](https://user-images.githubusercontent.com/83019343/151126001-1c589e67-9355-4e8b-a48f-69ad815208a1.PNG)

  <br/>

<b>(2) 커뮤니티로 활용해도 좋을 것 같아요<b/>
  - 추가 기능: 자유 게시판만으로 커뮤니티를 활성화시키기에는 부족하다고 느껴 스토리(동영상) 기능을 추가했습니다.
  ![쇼츠기능](https://user-images.githubusercontent.com/83019343/151127649-8a782d02-68e4-4cb6-b324-615b3b9075a0.PNG)
  
  <br/>
  
<b>(3) 지역 선택이 자유로웠으면 좋겠어요<b/>
  - 전: 기존의 카풀 게시물 필터기능은 지역선택을 필수로 해야만 검색이 가능하여 전 지역의 게시물을 볼 수 없었습니다.
  - 후: 지역을 선택사항으로 두어 전 지역의 게시물을 확인할 수 있게 되었습니다.
  ![필터 개선](https://user-images.githubusercontent.com/83019343/151128972-12a81d31-d9bc-45b8-a1d8-0ff9a7ea6a2e.PNG)

