# 설치 가이드

아래 지시사항을 통해 프로젝트를 실행하실 수 있습니다.

<br />

## 필수 구성 요소

- Node.js
- MongoDB

<br />

## 설치

1. 프로젝트 클론

```console
$ git clone https://github.com/ksmfou98/Untact-Operation-Command.git
```

2. 패키지 설치

```console
$ cd client
$ npm install
$ cd ../server
$ npm install
```

3. 환경 변수 설정  
   server 폴더 안에 .env 파일 생성 후 아래 내용 기입

```
PORT=8080
DBURL=몽고디비주소
JWT_SECRET=untact-operation-command
```

## Backend 서버 실행

```console
$ cd server
$ npm run dev
```

## Frontend 서버 실행

```console
$ cd client
$ npm start
```
