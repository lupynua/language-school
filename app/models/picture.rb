class Picture < ActiveRecord::Base
  validates :album_id, presence: true
  
  mount_uploader :image, ImageUploader
  belongs_to :album
end
