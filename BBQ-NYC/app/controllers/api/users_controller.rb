module Api
  class UsersController < ApplicationController

    def create
      @user = User.find_or_initialize_by({email: params[:email]})
      if @user.name == nil
        @user.name = params[:name]
      end

      @user.save

      @user_event = UserEvent.create({user_id: @user.id, event_id: params[:event_id]})

      render json: @user_event
    end

    def update
      @user_event = UserEvent.find_by({user_id: params[:id], event_id: params[:event_id]})
      @user_event.rsvp = params[:rsvp]

      @user_event.save
      render json: @user
    end

    def show
      @user = User.find(params[:id])
      render json: @user
    end

  end
end
