# Living Room Finder

けいいちさん / ほのかさんの 2 人で、同棲候補の物件を共有・比較するための Web アプリです。

このアプリは次の 2 つを組み合わせています。

- フロント
  - `index.html`
  - `style.css`
  - `app.js`
- Vercel の API
  - `api/import-property.js`
  - `api/shared-properties.js`

画面は HTML / CSS / JavaScript で動きます。  
ただし、次の 2 機能だけは Vercel の API が必要です。

- SUUMO / HOME'S の URL 自動読込
- 2 台で同じ物件リストを共有する機能

## 今回できるようになったこと

- 物件一覧の共有
  - 同じ `ワークスペース名` と `合言葉` を設定した 2 台で、同じ物件リストを見られます
- 利用者の切り替え
  - `けいいち` / `ほのか` は端末ごとに切り替えます
- URL 自動読込
  - Vercel 上では SUUMO / HOME'S の URL から補助入力を試せます
- 手入力フォールバック
  - 自動読込に失敗しても、そのまま手入力で登録できます
- 準備リスト
  - 買うもの / 持っていくもの を分けて管理できます
  - 数量、誰のものか、誰が対応するか、進み具合、メモを保存できます

## 共有の仕組み

### 共有されるもの

- 物件一覧
- 物件の基本情報
- 共通メモ
- 2 人分のレビュー

### 共有されないもの

- 「現在どちらとして操作しているか」の設定
- 共有ワークスペース名 / 合言葉の入力状態

これらはブラウザの localStorage に保存されます。  
つまり、

- `けいいち` / `ほのか` の選択は端末ごと
- 物件リストは共通

という役割分担です。

## ファイル構成

- `index.html`
  - 画面全体の HTML
- `style.css`
  - 物件画面と準備リスト画面、モーダル、レスポンシブ対応の CSS
- `app.js`
  - 一覧表示、詳細、追加編集、レビュー、共有同期、URL読込 UI、準備リストの処理
- `api/import-property.js`
  - SUUMO / HOME'S の URL を Vercel 側で取得して補助入力する API
- `api/shared-properties.js`
  - Supabase に保存した共有ワークスペースを読み書きする API
- `package.json`
  - Vercel Function で使う依存ライブラリの設定
- `supabase-shared-workspace.sql`
  - Supabase に共有用テーブルを作る SQL
- `README.md`
  - 使い方と制約の説明

## まず理解しておくこと

このプロジェクトには、公開先が 2 パターンあります。

### 1. GitHub Pages

- 画面は表示できる
- localStorage による端末内保存は使える
- `api/import-property.js` は動かない
- `api/shared-properties.js` も動かない
- そのため URL 自動読込と共有機能は使えない

### 2. Vercel

- 画面も表示できる
- URL 自動読込 API が動く
- 共有保存 API も動く

つまり、

- GitHub Pages = 見た目確認 / ローカル保存向け
- Vercel = 実運用向け

です。

## 準備リスト機能

`準備リスト` 画面では、同棲に必要なものを次の 2 種類に分けて管理できます。

- 買うもの
- 持っていくもの

各項目では次の内容を管理できます。

- 品名
- 分類
- 誰のものか
- 誰が持っていくか
- 誰が対応するか
- 進み具合
- 数量
- メモ

### できること

- 項目の追加
- 項目の編集
- 項目の削除
- ステータスの即時変更
- 絞り込み
- 並び替え

### サンプルデータ

初回起動時には、次のようなサンプル項目を自動で入れています。

- 冷蔵庫
- 洗濯機
- ベッド
- 炊飯器
- ドライヤー
- 食器棚

準備リストは、共有設定がオフのときは `localStorage` に保存します。  
共有設定をオンにすると、物件リストと一緒に Supabase へ保存され、2 台で同じ内容を見られます。

## 共有機能を動かすための準備

共有機能は `Supabase` を保存先として使います。  
Vercel の API が Supabase に接続し、その結果をアプリへ返します。

### 手順 1. Supabase プロジェクトを作る

1. Supabase にログインします
2. 新しい project を作ります
3. project ができたら、`Project URL` を確認します
4. `service_role` キーを確認します

### 手順 2. テーブルを作る

Supabase の SQL Editor を開いて、[supabase-shared-workspace.sql](/Users/K/living-room-finder/supabase-shared-workspace.sql) の内容を実行してください。

この SQL は、共有ワークスペースを 1 行ずつ保存するためのテーブルを作ります。  
すでに一度実行済みでも大丈夫なように、準備リスト共有用の `preparation_items` 列を `alter table ... add column if not exists ...` で追加する形にしています。

### 手順 3. Vercel に環境変数を設定する

Vercel のプロジェクト画面で、次の環境変数を設定します。

- `SUPABASE_URL`
  - Supabase の Project URL
- `SUPABASE_SERVICE_ROLE_KEY`
  - Supabase の service_role キー

必要なら次も使えます。

- `SUPABASE_SHARED_TABLE`
  - 共有テーブル名を変えたい場合だけ設定
  - 未設定なら `shared_workspaces`

### 手順 4. Vercel を再デプロイする

環境変数を入れたあとに再デプロイすると、共有 API が動くようになります。

## 実際の共有の使い方

1. Vercel の URL を開きます
2. `設定` を開きます
3. `現在の利用者` を選びます
4. `共有ワークスペース` の
   - ワークスペース名
   - 合言葉
   を入力します
5. もう片方の端末でも、同じ内容を入力します
6. 両方で保存すると、同じ物件一覧と準備リストを共有できます

### 使い方のコツ

- 最初の 1 台目が保存したとき、共有ワークスペースが自動作成されます
- 2 台目は同じワークスペース名と合言葉で接続します
- 以後は、物件保存・準備リスト保存のたびに共有データへ反映されます
- 右上の `今すぐ同期` で手動更新もできます

## ローカルでの確認方法

### 画面だけを確認する方法

```bash
cd /Users/K/living-room-finder
python3 -m http.server 8000
```

その後、ブラウザで `http://localhost:8000` を開きます。

この方法で確認できるもの:

- 画面レイアウト
- localStorage 保存
- 物件追加 / 編集 / 削除
- レビュー
- 地図

この方法で確認できないもの:

- URL 自動読込 API
- 共有保存 API

### 実運用に近い確認方法

一番簡単なのは、`Vercel の公開 URL` をそのまま使う方法です。

## 保存仕様

### localStorage に保存するもの

- `living-room-finder.currentUser`
  - 現在どちらとして操作しているか
- `living-room-finder.properties`
  - 直近のローカル表示用バックアップ
- `living-room-finder.sharedWorkspace`
  - 共有ワークスペース名
- `living-room-finder.sharedPassphrase`
  - 共有の合言葉
- `living-room-finder.preparationItems`
  - 同棲準備リストのローカル表示用バックアップ

### Supabase に保存するもの

共有ワークスペースの行に、次の内容を保存します。

- `slug`
  - ワークスペース名
- `access_hash`
  - 合言葉のハッシュ値
- `properties`
  - 物件一覧の JSON
- `preparation_items`
  - 準備リストの JSON
- `revision`
  - 競合検知用の番号
- `created_at`
- `updated_at`

## 保存データの消し方

### localStorage を消す

ブラウザの開発者ツールから localStorage を削除するか、コンソールで次を実行してください。

```js
localStorage.removeItem("living-room-finder.currentUser");
localStorage.removeItem("living-room-finder.properties");
localStorage.removeItem("living-room-finder.sharedWorkspace");
localStorage.removeItem("living-room-finder.sharedPassphrase");
localStorage.removeItem("living-room-finder.preparationItems");
location.reload();
```

### Supabase の共有データを消す

Supabase の `shared_workspaces` テーブルから、対象の `slug` の行を削除してください。

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

準備リストの各項目は、`app.js` 内で次の形にそろえています。

```js
{
  id,
  itemName,
  category,   // buy / carry
  ownerType,  // common / keiichi / honoka
  carryFrom,  // undecided / keiichi / honoka
  assignedTo, // undecided / keiichi / honoka
  status,     // todo / doing / done
  quantity,
  note,
  createdAt,
  updatedAt
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

## SUUMO / HOME'S の URL 自動読込の制約

この機能は、ブラウザで直接 `fetch()` するのではなく、`Vercel Function` から取得を試す構成にしています。  
そのため GitHub Pages 単体よりは実用的ですが、次の制約は残ります。

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

## 地図機能の制約

地図は Leaflet + OpenStreetMap を使っています。  
API キーは不要ですが、次の制約があります。

- 地図に表示するのは `latitude` / `longitude` が入っている物件だけ
- 住所だけから自動 geocoding はしていない
- 緯度 / 経度がない物件は地図に出ず、代わりに一覧で案内する
- Leaflet 本体と地図タイルは外部配信を使うため、ネット接続がないと地図が表示されない場合がある

## 共有機能の注意

- 共有ワークスペース名と合言葉は localStorage に保存されます
- 強い認証機能までは入れていないため、個人利用向けの簡易共有です
- 同時に別端末で保存すると、競合が起きることがあります
- 競合した場合は、最新データを読み直して「もう一度保存してください」と案内する仕様です

## 将来の拡張案

今は `ワークスペース + 合言葉` の簡易共有です。  
今後もっとしっかりした共有にしたい場合は、次の方向に広げられます。

### Supabase Auth を追加する案

- `けいいち` / `ほのか` を本当のユーザーアカウントにする
- 合言葉ではなくログインで共有する
- Row Level Security で、ワークスペースごとの権限を絞る
- Realtime で一覧更新を即時反映する
- 準備リストも同じワークスペース単位で共有できるようにする

### Firebase に移行する案

- Firestore に物件データを保存
- Authentication で利用者を分ける
- Snapshot Listener で一覧や詳細をリアルタイム同期する

今の `api/import-property.js` と UI はそのまま活かしながら、保存先だけを強化していく形で発展させやすくしています。
