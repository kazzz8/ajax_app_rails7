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
};
