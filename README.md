# How to run

```
# yarn을 씁시다. => 추후 pnpm or bun으로 갈아탈 예정

yarn install

docker-compose up -d --build

yarn prisma db push

yarn prisma db seed
```

## 설명

#### `yarn install `

prisma cli 및 docker container를 올리기 위해 패키지를 다운 받고 `yarn.lock` 파일을 생성

#### `docker-compose up -d --build`

`frontend`와 `db` 컨테이너를 가상머신에 올리기 위함.  
DB의 사용에 따라 굳이 Docker로 올리지 않고 그냥 `yarn dev` or `yarn build` and `yarn start` 를 사용해도 괜찮음.  
처음에 MongoDB를 사용하다가 Storage Warning이나 기타 메일들이 날라오는게 귀찮아서 로컬환경으로 DB를 올리기 위해 작성함.  
`frontend`, `db` 각각 컨테이너를 따로 관리해주는것도 귀찮아서 개발환경을 통일도 시킬겸 container ochestration으로 작성함.

로컬 개발용으로 작성했기 때문에 hot-reload를 지원하도록 작성함.

> 아직 SSR로 올리는 것 밖에 없는데 SSG도 나중에 하게되면 작성할 예정.

#### `yarn prisma db push`

DB container를 올리고 난 후 텅 빈 DB를 위해 작성한 `schema.prisma` 기반으로 DB Schema를 작성함.  
이 작업은 테이블 스키마만 만들어 줄 뿐, 당연히 데이터가 없음. (핸들링 아직 안해서 이거 안하면 에러남)

#### `yarn prisma db seed` (optional)

텅 빈 테이블을 위해 Mock up 데이터를 생성 해주는 명령어.  
`prisma/seed.ts` 파일에서 작성할 수 있음. 추후에 여러가지 옵션들을 추가할 예정.
