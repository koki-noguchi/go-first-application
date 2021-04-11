# go-first-application

## 概要
Go・Graphqlの勉強用リポジトリです。
APIサーバーのみ実装済みで、フロントとの繋ぎ込みはされていません。
追々、Reactを勉強して繋ぎ込む予定です。

## 機能一覧
- CRUD（投稿の一覧・詳細・作成・更新・削除）
- 認証・認可（サインアップ・ログインでJWTを発行・JWTでユーザーを検証）
- *現状の認証は、サインアップ・ログインしたユーザーに対して、２４時間期限のJWTを発行するものの、リフレッシュトークンを更新する処理が実装できていない。将来的に、FIrebaseで認可を再実装する予定
- ページネーション

## 使用技術
- docker / docker-compose
- Go 1.13
- Graphql
- mysql 8.0.1
