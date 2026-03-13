# Living Room Finder

けいいちさん / ほのかさんの 2 人で、同棲候補の物件を共有・比較するための Web アプリです。

見た目の画面は `HTML / CSS / JavaScript` だけで作っています。  
ただし、`SUUMO / HOME'S の URL を自動で読んで項目を補助入力する機能` だけは、`Vercel Function` を使います。

つまり今の構成は、次の 2 層です。

- フロント
  - `index.html`
  - `style.css`
  - `app.js`
- サーバー側の小さな API
  - `api/import-property.js`

## できること

- 利用者を `けいいち` / `ほのか` から選択して localStorage に保存
- 物件の追加、編集、削除
- 物件一覧のカード表示
- 物件詳細モーダル
- 2 人それぞれのレビュー管理
- 並び替え
  - 新しい順
  - 家賃が安い順
  - 家賃が高い順
  - 徒歩が短い順
  - 評価が高い順
- 絞り込み
  - 追加者
  - サイト種別
  - ランク
  - 家賃上限
  - 徒歩上限
  - フリーワード検索
- 地図表示
  - 緯度 / 経度が入っている物件だけ地図に表示
- 初回起動時のサンプルデータ投入
- Vercel 上での URL 自動読込
  - SUUMO / HOME'S の URL 判定
  - サーバー側で HTML を取得して、家賃 / 間取り / 面積 / 駅 / 徒歩 / 住所 / 築年数などを補助入力
  - 失敗時も URL を保持したまま手入力にフォールバック

## ファイル構成

- `index.html`
  - 画面全体の HTML
- `style.css`
  - レイアウト、カード、モーダル、レスポンシブ対応の CSS
- `app.js`
  - localStorage、一覧表示、詳細、追加編集、レビュー、フィルタ、地図、URL読込 UI の処理
- `api/import-property.js`
  - Vercel 上で動く URL 自動読込 API
- `package.json`
  - Vercel Function で使う依存ライブラリの設定
- `README.md`
  - 使い方と制約の説明

## まず理解しておくこと

このプロジェクトには、公開先が 2 パターンあります。

### 1. GitHub Pages

- 画面は表示できる
- 手入力の追加 / 編集 / 保存 / レビュー / 地図は使える
- `api/import-property.js` は動かない
- そのため URL 自動読込は使えず、手入力フォールバック中心になる

### 2. Vercel

- 画面も表示できる
- `api/import-property.js` も動く
- URL 自動読込を試せる

`URL 自動読込を使いたいなら、Vercel 側の URL を使う` のが基本です。

## セットアップ手順

### 画面だけをローカルで確認する方法

1. このフォルダを開きます
2. ターミナルで次を実行します

```bash
cd /Users/K/living-room-finder
python3 -m http.server 8000
```

3. ブラウザで `http://localhost:8000` を開きます

この方法だと、画面・保存・一覧・レビュー・地図は確認できます。  
ただし URL 自動読込 API は動きません。

### URL 自動読込まで含めて確認する方法

一番簡単なのは、`Vercel に公開した URL` をそのまま使う方法です。

このプロジェクトは Vercel に公開済みなら、`https://...vercel.app` の URL から自動読込を試せます。

ローカルで API まで完全に確認したい場合は、別途 Node.js と Vercel CLI が必要です。  
初心者のうちは、まず `Vercel の公開URLで確認する運用` がおすすめです。

## ローカルでの確認ポイント

最低限、次を確認すると全体が追いやすいです。

1. 初回表示でサンプル物件が出ること
2. 設定から `けいいち` / `ほのか` を切り替えられること
3. 物件を手入力で追加できること
4. 詳細画面からレビューを更新できること
5. 編集・削除が反映されること
6. 並び替えと絞り込みが効くこと
7. 緯度 / 経度がある物件だけ地図に出ること
8. Vercel URL では `URLから読込を試す` が動くこと

## Vercel 公開手順

1. GitHub リポジトリを用意します
2. Vercel に GitHub アカウントでログインします
3. `Import Project` からこのリポジトリを選びます
4. 最初はそのまま `Deploy` します
5. 以後は GitHub の更新に合わせて自動再デプロイされます

### Vercel で大事なポイント

- `api/import-property.js` は Vercel 上で API として動きます
- `package.json` にある `cheerio` は、Vercel がデプロイ時にインストールします
- そのため、URL 自動読込は `vercel.app` 側で使うのが前提です

## GitHub Pages 公開手順

1. このフォルダの内容を GitHub リポジトリに push します
2. GitHub のリポジトリ画面で `Settings` を開きます
3. `Pages` を開きます
4. `Build and deployment` の `Source` で `Deploy from a branch` を選びます
5. branch と `/ (root)` を選びます
6. 保存後、数分待つと公開 URL が発行されます

### GitHub Pages での注意

- GitHub Pages では `api/import-property.js` は動きません
- そのため URL 自動読込は失敗しやすく、手入力フォールバック前提です
- 見た目の確認や手入力中心の利用には向いています

## localStorage について

このアプリはブラウザの localStorage にデータを保存します。

使用しているキー:

- `living-room-finder.currentUser`
  - 現在どちらとして操作しているか
- `living-room-finder.properties`
  - 物件一覧データ

初回起動時は `living-room-finder.properties` が存在しない場合だけ、サンプルデータを自動投入します。  
一度保存済みなら、リロードしてもそのデータを使い続けます。

### 保存データの消し方

ブラウザの開発者ツールから localStorage を削除するか、コンソールで次を実行してください。

```js
localStorage.removeItem("living-room-finder.currentUser");
localStorage.removeItem("living-room-finder.properties");
location.reload();
```

### 大事な注意

localStorage は `ドメインごと` に別保存です。  
つまり次の 3 つは、同じデータにはなりません。

- `localhost`
- `github.io`
- `vercel.app`

同じ物件データを 2 人で本当に共有したい場合は、将来 `Supabase` や `Firebase` への移行が必要です。

## データ構造

各物件は `app.js` 内で次の形にそろえています。

```js
{
  id,
  title,
  sourceSite,
  url,
  rent,
  layout,
  areaSize,
  station,
  walkMinutes,
  address,
  builtYear,
  addedBy,
  memo,
  createdAt,
  updatedAt,
  latitude,
  longitude,
  reviews: {
    keiichi: { rank, comment, updatedAt },
    honoka: { rank, comment, updatedAt }
  }
}
```

## 評価順ソートのルール

`評価が高い順` は次のルールで並び替えています。

1. ランクを数値化します
   - `S = 4`
   - `A = 3`
   - `B = 2`
   - `C = 1`
   - 未評価 = `0`
2. `けいいち` と `ほのか` の **2 人平均** が高い物件を上位にします
3. 平均が同じ場合は、**2 人のうち高い方のランク** が高い物件を上位にします
4. それでも同じ場合は、`updatedAt` が新しい物件を上位にします

つまり、片方だけ高評価よりも、2 人とも評価が高い物件が上に来やすいルールです。

## SUUMO / HOME'S の URL 自動読込の制約

この機能は、ブラウザで直接 `fetch()` するのではなく、`Vercel Function` から取得を試す構成にしています。  
そのため、GitHub Pages 単体よりは実用的ですが、次の制約は残ります。

- 掲載サイト側が 403 などで取得を止めることがある
- HTML 構造が変わると抽出精度が落ちる
- すべての物件ページで同じように取れる保証はない
- 取得できても一部項目だけの「部分成功」になることがある

このアプリでは次の方針にしています。

- URL は必ず保持する
- サイト判定はする
- 自動読込に失敗しても、その場で終了しない
- 失敗時は「手入力で補完してください」と明示する
- 一部だけ取れた場合は、その分だけフォームに反映する

つまり、URL 自動読込は「全自動登録」ではなく、`入力補助` として使う想定です。

### 利用規約・運用上の注意

- SUUMO / HOME'S に公開 API がある前提では作っていません
- HTML 解析ベースなので、将来壊れる可能性があります
- 保存するのは、家賃・間取り・面積・駅・徒歩・住所・築年数などの最低限の事実データに留めています
- 画像や全文本文の保存は想定していません

## 地図機能の制約

地図は Leaflet + OpenStreetMap を使っています。  
API キーは不要ですが、次の制約があります。

- 地図に表示するのは `latitude` / `longitude` が入っている物件だけ
- 住所だけから自動 geocoding はしていない
- 緯度 / 経度がない物件は地図に出ず、代わりに一覧で案内する
- Leaflet 本体と地図タイルは外部配信を使うため、ネット接続がないと地図が表示されない場合がある

将来 geocoding を足す場合でも、今のデータ構造のまま `latitude` / `longitude` を後から埋めれば拡張できます。

## 将来の拡張案

今は localStorage 保存なので、同じブラウザ・同じ端末の中で使う前提です。  
2 人でリアルタイム共有したくなったら、次の方向に移行しやすい構成です。

### Supabase に移行する案

- `properties` テーブルを作る
- `reviews` を別テーブルに分ける、または JSON カラムで持つ
- 認証を追加して、けいいち / ほのか が別端末から同じデータを見る
- Realtime を使えば、片方の更新がもう片方に即反映される
- 今の `api/import-property.js` はそのまま URL 自動読込の入口として再利用できる

### Firebase に移行する案

- Firestore に物件データを保存
- Authentication で利用者を分ける
- Snapshot Listener で一覧や詳細をリアルタイム同期する

今の UI とデータ構造は、`localStorage` の読み書きを Supabase / Firebase の読み書きに置き換えていく形で発展させやすくしています。
