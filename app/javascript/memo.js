const buildHTML = (XHR) => {
  const item = XHR.response.post; //responseの中からキーがpostの情報を取り出して変数itemに格納している
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時:${item.created_at} 
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html; //変数htmlの内容を返す
}



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
    XHR.onload = () => { //onloadはリクエストの送信が成功したときに呼び出されるプロパティ。この中に成功したときに行う処理を定義する
      if (XHR.status != 200) { //エラーが発生していないか判定。発生していたらJavaScriptの処理から抜け出す
        alert(`Error ${XHR.status}: ${XHR.statusText}`)
        return null; //JavaScriptの処理から抜け出す。これ以降の処理は実行されない
      }
      const list = document.getElementById("list");
      const formText = document.getElementById("content") //id要素のcontentの値(つまり投稿内容）を取得
      list.insertAdjacentHTML("afterend", buildHTML(XHR)); //insertAdjacentHTMLはHTMLを挿入するメソッド。第一引数には挿入する位置、第二引数には挿入したい内容
      formText.value = "" //投稿が完了したらフォームに入力された内容を空にする
    };
  }); //投稿されたというイベントを認識したいのでsubmitをトリガーに指定
};

window.addEventListener('turbo:load', post);
//ページが読み込まれることをトリガーにして実行される。loadをトリガーにpost関数が実行される

//addEventListener 特定のイベントをトリガーに指定した関数を実行する
//要素.addEventListener(イベント名, 関数名)

//open()メソッドとはXMLHttpRequestオブジェクトのメソッドの一種。
//XHR.open("POST", "/posts", true)のように書く。
//XHR.open(HTTPメソッド, パス, 非同期通信であるか否か)