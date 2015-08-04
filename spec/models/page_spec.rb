require_relative '../rails_helper'

RSpec.describe Page, type: :model do
  it 'is valid with a title and body' do
    page = Page.new(
      title: 'Pages',
      body: 'This is our pages page!',
      path: 'Some path')
    expect(page).to be_valid
  end

  it 'is invalid without a title' do
    page = Page.new(title: nil)
    page.valid?
    expect(page.errors[:title]).to include('can\'t be blank')
  end

  it 'is invalid without a body' do
    page = Page.new(body: nil)
    page.valid?
    expect(page.errors[:body]).to include('can\'t be blank')
  end

  it 'is invalid without a path' do
    page = Page.new(path: nil)
    page.valid?
    expect(page.errors[:path]).to include('can\'t be blank')
  end
end
