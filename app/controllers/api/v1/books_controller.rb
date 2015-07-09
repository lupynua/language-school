module Api
  module V1
class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]

  
  def index
    #@books = Book.all

    # respond_to do |format|
    #   format.html # index.html.haml
    #   format.json { render :json => @books}
    # end
    @books = Book.all
    render json: @books
  end

  
  def show
    @book = Book.find(params[:id])

    respond_to do |format|
      format.html # index.html.haml
      format.json { render :json => @books}
    end
  end

  
  def new
    @book = Book.new

    respond_to do |format|
      format.html # index.html.haml
      format.json { render :json => @books}
    end
  end

  
  def edit
    @book = Book.find(params[:id])
  end

  
  def create
    @book = Book.new(book_params)

    # if @book.save
    #   redirect_to @book, notice: 'Book was successfully created.'
    # else
    #   render :new
    # end
    respond_to do |format|
      if @book.save
        format.html { redirect_to @book, notice: 'Book was successfully created.' }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  
  def update
    # if @book.update(book_params)
    #   redirect_to @book, notice: 'Book was successfully updated.'
    # else
    #   render :edit
    # end
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, notice: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  
  def destroy
    @book.destroy
    # redirect_to books_url, notice: 'Book was successfully destroyed.'
    respond_to do |format|
      format.html { redirect_to books_url, notice: 'Book was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    
    def set_book
      @book = Book.find(params[:id])
    end

    
    def book_params
      params.require(:book).permit(:title, :description, :attachment)
    end
end
end
end
