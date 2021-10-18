# go-first-application

## 概要
セルフコンパッションを鍛えるためのアプリを作成中

以下のコンパッション日記を書くことで、自分への優しさ・人間の共通性・マインドフルネスを鍛えることを目的としている。
1. １日のネガティブな出来事を振り返り
2. 1を書いている最中に浮かんできた思考を書く
3. 親しい友人が同じことで悩んでいると仮定し、その人に何を言ってあげたいか書く
4. 2と3の違いを比較する
5. 今度は自分に対して言ってあげたい言葉を書く

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
- Apollo
- graphql-code-generator
