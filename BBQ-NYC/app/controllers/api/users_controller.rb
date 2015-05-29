module Api
  class UsersController < ApplicationController

    def create
      #@user_event = UserEvent.create({user_id: params[:user_id], event_id: params[:event_id]})
      #render json: @user_event

      @user = User.find_or_initialize_by({email: params[:email]})
      if @user.name == nil
        @user.name = params[:name]
      end 
      @user.save

      # @event = Event.find_by({name: params[:name]})

      render json: @user
    end

    def update
      @user = User.find(params[:id])
      @user.name = params[:name]
      @user.save
      # render json: @user
      redirect_to '/#events/' + params[:event_id]
    end

    def show
      @user = User.find(params[:id])

      render json: @user
    end


  end
end