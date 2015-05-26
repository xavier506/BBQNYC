module Api
  class UsersController < ApplicationController

    def create
      @user = User.find_or_initialize_by({email: params[:email]})
      @user.name = params[:name]

      @user.save

      @user_event = UserEvent.create({user_id: @user.id, event_id: params[:event_id]})

      render json: @user_event
    end

  end
end
