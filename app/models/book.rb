class Book < ActiveRecord::Base
	mount_uploader :attachment, AttachmentUploader 
    validates :title, :description, presence: true, length: { minimum: 3 }
    #validates :attachment, uniqueness: { scope: :book_id }
end
