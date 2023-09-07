class PostsController < ApplicationController
  def index
    @posts = Post.order(id: "DESC")
  end

  def new
  end

  def create
    post = Post.create(content: params[:content])
    render json:{ post: post} #一行上で定義している変数postをpostというキーを指定してJavaScriptに送っている
  end
end
