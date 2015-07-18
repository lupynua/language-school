class Album < ActiveRecord::Base
  validates :title, presence: true

  has_many :pictures, dependent: :destroy
  accepts_nested_attributes_for :pictures

  def as_json(options = {})
    super(options.merge(:include => [:pictures]))
  end
end
