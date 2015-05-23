class Event < ActiveRecord::Base
  belongs_to :location
  has_many :users, through: :user_events
  has_many :supplies
end
