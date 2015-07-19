class Picture < ActiveRecord::Base
  validates :album, presence: true
  belongs_to :album
  mount_uploader :image, ImageUploader
end
