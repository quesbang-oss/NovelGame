# リース・レイデン ノベルゲーム土台（GitHub Pages対応版）

このプロジェクトは GitHub Pages に自動デプロイできる Vite 製ノベルゲーム土台です。

## GitHub Pagesで公開する方法

### 1. GitHubにリポジトリを作る

GitHubで新しいRepositoryを作成します。

### 2. このZIPの中身をアップロード

ZIPを解凍し、**中に入っているファイルとフォルダをリポジトリの一番上の階層にアップロード**してください。

`index.html` と `package.json` がリポジトリ直下にある状態が正しいです。

### 3. mainブランチにpush

GitHub上でファイルを追加した場合も、mainブランチにコミットしてください。

### 4. GitHub Pagesを設定

GitHubリポジトリの

`Settings` → `Pages`

を開きます。

`Build and deployment` の `Source` を **GitHub Actions** にします。

### 5. 自動デプロイ

`.github/workflows/deploy-pages.yml` が自動的にViteをビルドし、GitHub Pagesへ公開します。

`Actions` タブで `Deploy to GitHub Pages` が成功したら公開完了です。

公開URLは通常、

`https://あなたのGitHubユーザー名.github.io/リポジトリ名/`

になります。

## ローカルで起動する場合

```bash
npm install
npm run dev
```

## 技術

- HTML5
- JavaScript ES Modules
- Vite
- CSS
- GitHub Actions
- GitHub Pages
