# go-first-application

## 概要
Go・Graphqlの勉強用リポジトリです。

## 機能一覧
- CRUD（投稿の一覧・詳細・作成・更新・削除）
- Firebaseで認証・jwt-goで認可（サインアップ・ログインでJWTを発行・JWTでユーザーを検証）
- ページネーション

## 使用技術
### バックエンド
- docker / docker-compose
- Go 1.13
- echo（ルーティング）
- gorm
- Graphql（gqlgenでスキーマ駆動開発）
- mysql 8.0.1
- Firebase Authentication
### フロントエンド
- React
- TypeScript
- semantic-ui
