class Event < ActiveRecord::Base
  validates :name, :description, :date, :place, :capacity, presence: true
  validates :name, length: {minimum: 5, maximum: 50}
  validates :description, length: {minimum: 50, maximum: 1000}

  geocoded_by :place
  after_validation :geocode, :if => :place_changed?
end
