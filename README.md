# SOCIALIZING-PARTY-GAME

## 기록용 글

### TypeORM + SQLite 포기 -> MongoDB + Mongoose로 변경

- `DataTypeNotSupportedError: Data type "Object" in is not supported by "sqlite" database.` 이런 에러가 계속 뜸.

- MongoDB가 무료로도 돌릴 수 있기 때문에, MongoDB로 바꿈.

- TypeORM의 MongoDB는 부족한 점이 많아서 Mongoose를 사용하기로 함.