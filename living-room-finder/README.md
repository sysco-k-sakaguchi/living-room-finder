# Living Room Finder

けいいちさん / ほのかさんの 2 人で、同棲候補の物件を共有・比較するための静的 Web アプリです。  
HTML / CSS / JavaScript だけで動作し、GitHub Pages にそのまま配置できます。

ビルドツール不要、Node.js 不要、API キー不要です。  
「URL 自動読込が失敗しても、手入力でそのまま運用できること」を最優先にしています。

## 主な機能

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

## ファイル構成

- `index.html`
  - 画面全体の HTML
- `style.css`
  - レイアウト、カード、モーダル、レスポンシブ対応の CSS
- `app.js`
  - localStorage、一覧表示、詳細、追加編集、レビュー、URL読込、地図の処理
- `README.md`
  - 使い方と制約の説明

## セットアップ手順

1. このフォルダをそのまま開きます。
2. `index.html` をブラウザで開きます。

ローカル確認はダブルクリックでも基本動作しますが、ブラウザ差異を減らすため簡易サーバーを使う方法をおすすめします。

```bash
cd /Users/K/living-room-finder
python3 -m http.server 8000
```

その後、ブラウザで以下を開きます。

- `http://localhost:8000`

## ローカルでの確認方法

最低限、次を確認すると全体が追いやすいです。

1. 初回表示でサンプル物件が出ること
2. 設定から `けいいち` / `ほのか` を切り替えられること
3. 物件を手入力で追加できること
4. 詳細画面からレビューを更新できること
5. 編集・削除が反映されること
6. 並び替えと絞り込みが効くこと
7. 緯度 / 経度がある物件だけ地図に出ること

## GitHub Pages 公開手順

1. このフォルダの内容を GitHub リポジトリに push します。
2. GitHub のリポジトリ画面で `Settings` を開きます。
3. `Pages` を開きます。
4. `Build and deployment` の `Source` で `Deploy from a branch` を選びます。
5. 公開したい branch と `/ (root)` を選びます。
6. 保存後、数分待つと公開 URL が発行されます。

このアプリはビルド不要なので、ルートにある `index.html` / `style.css` / `app.js` をそのまま公開できます。

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

このアプリでは、まず URL 文字列から `SUUMO` / `HOME'S` の判定を行います。  
その後、ブラウザから `fetch()` でページ取得を試し、取得できた場合だけ HTML から物件情報を補助抽出します。

ただし、実際には次の制約があります。

- ブラウザの CORS 制約で、他サイトの HTML を直接取得できないことが多い
- 掲載サイト側の仕様変更で抽出しづらいことがある
- 完全自動取得を保証できない

そのため、このアプリでは以下の方針にしています。

- URL は必ず保持する
- サイト判定はする
- 自動読込に失敗しても、その場で終了しない
- 失敗時は「手入力で補完してください」と明示する
- 手入力フォームにそのまま続けられる

実用上は「URL を保存して、足りない項目だけ手入力する」使い方を想定しています。

## 地図機能の制約

地図は Leaflet + OpenStreetMap を使っています。  
API キーは不要ですが、次の制約があります。

- 地図に表示するのは `latitude` / `longitude` が入っている物件だけ
- 住所だけから自動 geocoding はしていない
- 緯度 / 経度がない物件は地図に出ず、代わりに一覧で案内する
- Leaflet 本体と地図タイルは外部配信を使うため、ネット接続がないと地図が表示されない場合がある

将来 geocoding を足す場合でも、今のデータ構造のまま `latitude` / `longitude` を後から埋めれば拡張できます。

## 実装方針メモ

- 手入力でちゃんと使えることを最優先
- URL 自動読込は「補助機能」として実装
- localStorage を中心に、ブラウザだけで完結
- 初心者が追いやすいよう、処理を `app.js` にまとめつつ役割ごとに分割
- モバイル優先で設計し、PC では一覧と地図を横並びにしやすいレイアウト

## 将来の拡張案

今は localStorage 保存なので、同じブラウザ・同じ端末の中で使う前提です。  
2 人でリアルタイム共有したくなったら、次の方向に移行しやすい構成です。

### Supabase に移行する案

- `properties` テーブルを作る
- `reviews` を別テーブルに分ける、または JSON カラムで持つ
- 認証を追加して、けいいち / ほのか が別端末から同じデータを見る
- Realtime を使えば、片方の更新がもう片方に即反映される

### Firebase に移行する案

- Firestore に物件データを保存
- Authentication で利用者を分ける
- Snapshot Listener で一覧や詳細をリアルタイム同期する

今の UI とデータ構造は、`localStorage` の読み書きを Supabase / Firebase の読み書きに置き換えていく形で発展させやすくしています。
