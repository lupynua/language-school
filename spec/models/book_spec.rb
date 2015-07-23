require 'rails_helper'
describe Book, :type => :model  do
  it "is valid with a title, description" do
    book = Book.new(
      title: 'Grammar',
      description: 'consist of all rules')
    expect(book).to be_valid
  end

  it "has a valid factory" do
    expect(FactoryGirl.create(:book)).to be_valid
  end
  it "is invalid without a title" do
    expect(FactoryGirl.build(:book, title: nil)).to_not be_valid
  end
  it "is invalid without a description" do
    expect(FactoryGirl.build(:book, description: nil)).to_not be_valid
  end
   it "booklist is empty" do
    expect(Book.count).to eq 0
   end
   it "returns check title of the book" do
     book = Book.new(title: 'Book', description: 'About Book',
     attachment: 'lalala')
     expect(book.title).to eq 'Book'
   end
   it "returns check description of the book" do
     book = Book.new(title: 'Second', description: 'About second Book',
     attachment: 'lalala')
     expect(book.description).to eq 'About second Book'
   end
  end
  