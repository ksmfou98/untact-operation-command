# <div align="center">untact-operation-command ( UOC )</div>

### <div align="center">군인들을 위한 화상 플랫폼💂 <b>비대면 작전 사령부</b></div>

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
<img src="/docs/images/userAPI.png" align="left"  width="100%" />      
<img src="/docs/images/meetAPI.png" align="left"  width="100%" />      
<img src="/docs/images/calendarAPI.png" align="left"  width="100%" />

</div>

<br />

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

-
