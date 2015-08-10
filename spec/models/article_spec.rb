require 'rails_helper'

RSpec.describe Article, type: :model do
  it "creates article with author" do
    article = build(:article_with_author)
    expect(article.valid?).to eq(true)
  end

  it "does not create article without author" do
    article = build(:article)
    expect(article.valid?).to eq(false)
  end

  it "creates article without title" do
    article = build(:article, title: nil)
    expect(article.valid?).to eq(false)
  end

  it "does not create article with duplicated title" do
    create(:article_with_author, title: 'duplicated')
    article = build(:article, title: 'duplicated')
    expect(article.valid?).to eq(false)
  end

  it "does not create article without body" do
    article = build(:article, body: nil)
    expect(article.valid?).to eq(false)
  end

  it "does not create article without status" do
    article = build(:article, status: nil)
    expect(article.valid?).to eq(false)
  end
end
