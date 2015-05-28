class Event < ActiveRecord::Base
  belongs_to :location
  has_many :users, through: :rsvps
  has_many :supplies
end
