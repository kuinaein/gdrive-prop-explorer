# Google Drive Property Exploerer

Google Drive 上のファイルのプロパティをドライブの画面上で見られないようなので手製したユーティリティです。

Web アプリケーションとして動作します。

## 使い方

基本的に`src/`以下のファイルを Apps Script プロジェクトとしてアップロードし、Drive API の実行権限を付けてやれば動くはずです。

1. `.env.example`を`.env`にコピーする
1. `yarn deploy`ないし`npm run deploy`を叩く
1. 特に`.env`を書き換えなかった場合はマイドライブ直下に新しいプロジェクトができる
1. スクリプトエディタのメニュー「表示＞ Cloud Platform プロジェクト...」で表示されるダイアログの右下「API コンソールを表示」から飛んで Drive API を有効化する
1. 公開＞ウェブアプリケーションとして導入で更新ボタンを押す

## ライセンス

パブリックドメイン、CC0 と Unlicense のトリプルライセンスとします。

- Unlicense http://unlicense.org
- CC0 https://creativecommons.org/publicdomain/zero/1.0/deed.ja
