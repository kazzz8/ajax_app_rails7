function post (){
  //リクエストを送信する処理
  const form = document.getElementById("form"); //getElementByIdで取得した投稿ボタンの要素を変数formに格納している。今回のアプリは投稿ボタンをトリガーに実行するため
  form.addEventListener("submit", (e) => { //第二引数eはイベント発生時の情報を持っている。今回でいうと「投稿ボタンがクリックされた」というイベント。eはイベントの頭文字
    e.preventDefault(); //preventDefaultメソッドは既定のイベントを無効化する。今回でいうと「投稿ボタンがクリックされた」というイベントを無効化している。これによって二重で投稿されることを防いでいる
    const formData = new FormData(form); //new FormDataオブジェクトはフォームに入力された値を取得できるオブジェクト。引数にフォーム要素を渡すことで入力さらた値を取得できる
    const XHR = new XMLHttpRequest(); //非同期通信を行うためにXMLHttpRequestオブジェクトを生成している
    XHR.open("POST", "/posts", true); //非同期通信であることを指定している
    XHR.responseType = "json"; //データ形式を指定している。jsonはよく使われるやつ
    XHR.send(formData); //sendはリクエストを送信するメソッド。XHRの設定アレコレをして、値はフォームに入力されたものを送っている
  }); //投稿されたというイベントを認識したいのでsubmitをトリガーに指定
};

window.addEventListener('turbo:load', post);
//ページが読み込まれることをトリガーにして実行される。loadをトリガーにpost関数が実行される

//addEventListener 特定のイベントをトリガーに指定した関数を実行する
//要素.addEventListener(イベント名, 関数名)

//open()メソッドとはXMLHttpRequestオブジェクトのメソッドの一種。
//XHR.open("POST", "/posts", true)のように書く。
//XHR.open(HTTPメソッド, パス, 非同期通信であるか否か)