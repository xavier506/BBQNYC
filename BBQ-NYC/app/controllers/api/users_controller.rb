module Api
  class UsersController < ApplicationController

    def create
      #@user_event = UserEvent.create({user_id: params[:user_id], event_id: params[:event_id]})
      #render json: @user_event

      @user = User.find(params[:name])
      @event = Event.find(params[:name])
      UserNotifier.send_srsvp_email(@user).deliver
    end

    def update
      #@user_event = UserEvent.find_by({user_id: params[:id], event_id: params[:event_id]})
      #@user_event.rsvp = params[:rsvp]

      #@user_event.save
      #render json: @user
    end

    def show
      #@user = User.find(params[:id])
      #render json: @user
    end

  end
end