# ベースイメージとしてNode.js 24のAlpine版を使用
FROM node:24-alpine

# pnpm をインストール
# Alpine Linuxの場合、corepack が標準で付属しているため、corepack を有効にするのが推奨
RUN apk add --no-cache libc6-compat
RUN corepack enable

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピー
COPY package.json pnpm-lock.yaml ./

# 依存関係をインストール (pnpmを使用)
# --prod オプションは、プロダクション環境での依存関係のみをインストールするために使用されます。
# RUN pnpm install --prod --frozen-lockfile
# 依存関係をインストール (開発環境だと以下のようにする)
RUN pnpm install --frozen-lockfile

# アプリケーションのコードをコピー
COPY . .

# アプリケーションがリッスンするポート
EXPOSE 5173

# アプリケーションを起動
CMD ["pnpm", "dev"]