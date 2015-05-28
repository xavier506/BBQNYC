class User < ActiveRecord::Base
  has_many :events, through: :rsvps
  has_many :supplies
end
