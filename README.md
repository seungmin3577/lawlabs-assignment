# 개요

이 저장소는 과제를 위한 저장소 입니다.

# 요구사항

```bash
모든 개발은 REST API형식이며, 데이터베이스 테이블도 제작하셔야합니다.

회원가입, 로그인, 회원정보수정, 상품등록, 상품수정, 상품조회  API를 작성해 보세요.

1) 회원은 단계별 등급으로 구분되어야 합니다. 등급구성은 자유입니다.(최소3단계 ~ 최대 5단계)

예) 관리자, VIP회원, 일반회원

2) 회원정보는 아이디, 패스워드, 회원등급 3가지의 정보로 제작하시면 됩니다.

3) 상품정보는 상품명, 상품가격, 재고 3가지의 정보로 제작하시면 됩니다.

4) 회원 등급별로 볼 수 있는 데이터가 다르게 제작해주시면 됩니다.

예1) 관리자는 상품등록, 상품수정, 상품조회

예2) VIP회원은 VIP전용 상품과 일반상품 조회

예3) 일반회원은 일반회원 전용 상품 조회

5) 상품조회는 로그인 한 회원별로 다른 데이터를 보내주도록 제작해주시면 됩니다.

예) 상품이 VIP회원에만 노출되게 한 후 로그인 사용자가 일반회원이면 접근을 못하도록 권한설정

예) 상품이 VIP회원에만 가격이 다른게 설정
```

# Requirements

- NodeJS
- Docker
- Yarn
- PM2

-[Docker](https://www.docker.com/get-started) -[NodeJS](https://nodejs.org/ko/download/) -[Yarn](https://yarnpkg.com/getting-started) -[PM2](https://pm2.keymetrics.io/)

# Settings

## database settings

```bash
$ docker-compose up -d
```

## environment settings

```bash
$ cp .env.example .env
```

## install modules

```bash
$ yarn
```

## run the project for development

```bash
$ yarn start:dev
```

## deploy

```bash
$ yarn deploy
```
