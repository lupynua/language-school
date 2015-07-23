require 'rails_helper'
RSpec.describe Album, :type => :model do
  before do
    Album.delete_all
    @album1 = Album.create!(title: "Title1", description: "Long description1", user_id:1)
    @album2 = Album.create!(title: "Title2", description: "Long description2", user_id:2)
  end
    
  it "add 2 albums" do
    expect(Album.count).to eq 2
  end
  it "save correct title" do
    expect(@album1.title).to eq "Title1"
  end
  it "save correct description" do
    expect(@album1.description).to eq "Long description1"
  end
  it "save changed title" do
    @album1.title =  "New title"
    expect(@album1.title).to eq "New title"
  end
end

context "validation" do
  before do
      @album1 = Album.create!(title: "Foo", description: "Bar", user_id:22)
      @album2 = Album.create(title: "", description: "Bar2", user_id:222)
    end
  it "requires title" do
      expect(@album1).to be_valid
    end
  it "fails if no title" do
      expect(@album2).to be_invalid
  end
  it "have empty array of pictures" do
      expect(@album1.pictures).to eq []
  end
end 

