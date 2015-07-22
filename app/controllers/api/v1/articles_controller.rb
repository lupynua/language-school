class Api::V1::ArticlesController < ApplicationController
  before_action :set_article, only: [:edit, :update, :destroy]

  def index
    render json: Article.all
  end

  def show
    render json: Article.find(params[:id])
  end

  def create
    @article = current_user.articles.build(article_params)
    @article.user_ids = current_user.id

    if @article.save
      render json: @article
    else
      head :unprocessable_entity
    end
  end

  def update
    if @article.update(article_params)
      render json: @article
    else
      head :unprocessable_entity
    end
  end

  def destroy
    @article.destroy
    head :no_content
  end

  private

  def set_article
    @article = current_user.articles.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :body, :status)
  end
end
