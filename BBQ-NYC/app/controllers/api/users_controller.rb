module Api
  class UsersController < ApplicationController

    def create
      @user = User.find(params[:name])
      @event = Event.find(params[:name])
      UserNotifier.send_srsvp_email(@user).deliver
    end

  end
end