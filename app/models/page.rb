class Page < ActiveRecord::Base
	validates :body, presence: true
	validates :title, presence: true
	validates :path, presence: true
end
