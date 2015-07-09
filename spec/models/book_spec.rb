require 'rails_helper'
  describe Book, :type => :model  do
   # it "is valid with a title, description" do
   #  book = Book.new(
   #      title: 'Grammar',
   #      description: 'consist of all rules')
   #    expect(book).to be_valid
   #  end
  
   # it "is invalid without a title" do
   #  book = Book.new(title: nil)
   #  book.valid?
   #  expect(book.errors[:title]).to include("can't be blank")
   # end
   before(:each){
        @book = FactoryGirl.create(:book)
    }
   it "has none to begin with" do
    expect(@book.count).to eq 0
   end
   # it "has none to begin with" do
   #  expect(@book.count).to eq 0
   # end
   # it "returns check title of the book" do
   #   book = Book.new(title: 'Book', description: 'About Book',
   #   attachment: 'lalala')
   #   expect(book.title).to eq 'Book'
   # end
   # it "returns a contact's full name as a string" do
   #   book = Book.new(title: 'Second', description: 'About second Book',
   #   attachment: 'lalala')
   #   expect(book.description).to eq 'About second Book'
   # end
  end