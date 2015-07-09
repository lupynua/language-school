FactoryGirl.define do
 factory :book do
   title 'lalala'
   description 'lalala'
   attachment File.open(File.join(Rails.root, '/spec/fixtures/books/book1.odt'))
   after(:build) do |book, eval|
        book << FactoryGirl.build(book: book)
    end
 end
end