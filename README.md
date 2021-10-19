# <div align="center">untact-operation-command ( UOC )</div>

### <div align="center">군인들을 위한 화상 플랫폼💂 <b>비대면 작전 사령부</b></div>

<img src="/docs/images/banner.png"  align="left"  width="100%" />

<br />

코로나바이러스감염증-19(COVID-19)가 전 세계를 강타하면서 삶의 많은 부분이 변했습니다. 온라인으로 진행하는 행사와 강의, 무인 키오스크 등 모든 것을 비대면으로 행하는 사회가 되었습니다. 이에 따라 군 내에서도 비대면의 필요성이 대두 되었고, 현재 대부분의 컨텐츠는 온라인으로 진행하고 있습니다. 하지만 이것들은 실시간 영상 시청 방식을 사용하여 일방적인 정보 전달만 가능합니다. 효율적으로 상호작용 하기 위해서는 즉각적인 양방향 소통이 가능해야 합니다. 따라서 저희는 화상회의 시스템을 각 군 상황에 맞게 적용하고자 하였습니다. 웹에서 화상 통화가 가능하게 서비스할 것이고 현재 온라인으로 진행 중인 종교 활동이나 강의, 상담에 까지 이용할 수 있도록 기획하였습니다.

<br />

## UOC 기능

### webRTC & socket io

- 웹캠을 이용한 화상 통화 (1:N 통화 가능, 캠,마이크,스피커 설정 변경 가능)
- 컴퓨터 화면 공유 기능
- 채팅 기능
- 진행 중인 화상회의 목록 제공
- 회의 검색 기능
- 회의 생성 기능 (회의 이름, 썸네일, 설명, 비밀번호 설정 가능)
- 회의 참석자 목록 제공
- 회의 종료 (호스트가 회의 종료시 자동 회의 종료)

### jwt & OAuth2.0

- jwt를 이용해 안전하게 사용자 인증 (로그인, 회원가입)
- OAuth2.0을 이용해 간편하고 안전한 소셜 로그인 (google 계정으로 회원가입, 로그인)

### full Calander

- 화상 회의 일정 등록,수정,삭제 가능
- 회의 일정 주/월/일별 확인 가능

### user

- 친구 목록, 추가, 삭제 가능
- 친구와 1:1 화상채팅 원클릭 생성
- 개인 정보 수정 가능

<br />

## 프로젝트 시연

프로젝트 완성 후 공개 🤣

<br />

## DataBase

<div>
<img src="/docs/images/DataBase.png" align="left"  width="100%" />    
</div>

<br />

## API DOCS

<div>
<img src="/docs/images/userAPI.PNG" align="left"  width="100%" />      
<img src="/docs/images/meetAPI.PNG" align="left"  width="100%" />      
<img src="/docs/images/calendarAPI.PNG" align="left"  width="100%" />

</div>

<br />

<br />

📖

## 개발 스택

### Front-End

- React
- React-Router
- Recoil
- Styled-components
- socket io
- typescript

### Back-End

- Nodejs
- Express
- MongoDB
- Mongoose
- socket io
- typescript
- wrtc

<br />

## 프로젝트 실행 방법

프로젝트 [설치 가이드 보러가기](docs/installation.md)

<br />

## 개발 기록

<br />

### 2021.10.17

- google 회원가입 API
- google 로그인 API
- user model에 social 계정 관련 schema 추가
- 구글 로그인, 회원가입 (프론트 - 백 연동)

### 2021.10.15

- 마이페이지 반응형 구현
- 친구목록 페이지 반응형 구현
- 일정 페이지 반응형 구현

### 2021.10.14

- google-login-client 설정

### 2021.10.13

- 친구 추가, 삭제 후 새로고침 없이 친구목록 정보 업데이트 하게 설정

### 2021.10.12

- 친구 검색 기능 구현
- 친구 추가 기능 구현

### 2021.10.11

- 캠 설정 변경 기능 추가
- 화면 공유 기능 구현
- Mobile Header UI 구현
- Mobile SideBar UI 구현
- Mobile SearchBar UI 구현

### 2021.10.10

- 개인 정보 수정 기능 구현
- 개인 정보 수정 UI 구현
- 개인 정보 (프론트 - 백 연동)

### 2021.10.09

- 회의 비밀번호 모달 수정

### 2021.10.08

- 회의 검색 API
- 회의 검색 UI 구현
- 회의 검색(프론트 - 백 연동)
- searchForm hooks로 분리

### 2021.10.07

- 비밀 회의 입장시 비밀번호 modal 생성
- 회의 비밀번호 체크 API 구현
- 회의 비밀번호 체크 UI 구현
- 회의 비밀번호 체크 (프론트 - 백 연동)
- meet Model Schema에 menu추가
- Home Nav Menu 활성화 UI
- Home Nav Link 기능 구현

### 2021.10.06

- 친구 삭제 기능 구현

### 2021.10.05

- 화상 회의속 채팅방 UI 수정

### 2021.10.04

- 회의 종료시 호스트가 회의를 종료했습니다 모달 창 띄우기
- AuthError 컴포넌트 생성
- socket 코드 리팩토링

### 2021.10.03

- MeetNotFound Image 추가
- 음소거 안했는데 말 안들리는 현상 해결
- 음소거하면 상대방 한테 내 음소거 상태 보여주기
- schedule 상세보기 구현
- 화상 회의 속 채팅방 기능 구현

### 2021.10.02

- 회의 video 더블클릭시 전체화면
- Image 공통 컴포넌트 반응형으로 구현
- 회의 Sidebar toggle시 animation 효과 적용
- 채팅 Sidebar UI 구현

### 2021.10.01

- 호스트가 회의 종료시 회의 삭제
- Auth localStorage -> sessionStorage
- logout 클릭시 userState를 useResetRecoil로 초기화
- 회의 참여시 사이드바에 보여지는 user.id를 user.name으로 변경
- 회의 방 제목 띄우기

### 2021.09.30

- Meet Thumbnial 이미지 업로드(백-프론트 연동)
- 화면 공유 Icon 변경
- 특정 회의 조회 API
- Meet validation
- Loading 공통 컴포넌트 구현
- 회의 목록 불러올때 loading 컴포넌트 추가

### 2021.09.29

- schedule 등록시 새로고침 없이 화면 출력
- 로그인 해야만 스케줄 등록가능하게 수정

### 2021.09.28

- 일정생성 client-server 연동
- read Meet List API 구현
- Meet Thumbnail Img Upload API 구현
- Meet 생성 (백-프론트 연동)
- Meet 리스트 조회(백-프론트 연동)

### 2021.09.27

- meet model 수정
- create Meet API 구현

### 2021.09.26

- userStorage(localStorage) 적용
- recoil initializeState 설정
- MembersPage
- Login API와 Client 연동
- Register API와 Client 연동
- Logout API와 Client 연동
- Members List 조회

### 2021.09.25

- LoginPage UI 구현
- RegisterPage UI 구현
- useInput 공통 hooks 생성

### 2021.09.24

- 일정 관리 TimeIssue 해결

### 2021.09.23

- 일정 생성, 일정 조회, 일정 삭제 API 구현

### 2021.09.22

- 스케줄 일정 생성 Modal UI 구현

### 2021.09.21

- 스케줄 일정 생성 Button 구현

### 2021.09.20

- 화상회의 목록 Grid UI 구현
- HomePage 반응형 UI 구현
- Calendar model 구현
- Calendar UI 구현 (fullcalendar library 사용)
- Modal 공통 컴포넌트 구현
- 회의 생성 Modal UI 구현

### 2021.09.19

- user model 구현
- user login, logout, register API, 라우터 구현
- user checkLoggedIn 미들웨어 구현

### 2021.09.18

- 메인 Page Title 설정
- chaanel-API-KEY config 파일로 이동

### 2021.09.17

- channel-plugin 구현
- Aside 반응형(테블릿) 구현

### 2021.09.16

- media, palette 추가
- 메인 Aside 템플릿 추가

### 2021.09.15

- app.ts에서 socket 함수 파일 분리
- meet 모델 생성

### 2021.09.12

- 화면 공유 기능(getDisplayMedia) 예제코드 추가

### 2021.09.11

- Eslint 에러 제거
- Video 화질 고화질로 설정

### 2021.09.10

- SFU 서버 타입스크립트로 변경

### 2021.09.09

- Meet 종료 기능, 버튼 추가
- 유저 목록 버튼 추가
- user SideBar에 유저 목록 표시
- user SideBar에 음소거 아이콘 추가

### 2021.09.08

- Meet Grid 비율 수정
- video Toggle, audio Toggle 추가

### 2021.09.07

- Meet User Side Bar 구현

### 2021.09.06

- my Stream 정보 추가
- 캠 비율 width, height 값 설정

### 2021.09.05

- socket room 설정
- Meet Grid UI 생성

### 2021.09.04

- client-SFU peer 연결 구현

### 2021.09.02

- SFU 서버 구축

### 2021.08.24

- socket 서버 생성
