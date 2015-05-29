module Api
  class UsersController < ApplicationController

    def create
      @user = User.find_or_initialize_by({email: params[:email]})
      if @user.name == nil
        @user.name = params[:name]
      end 
      @user.save

      render json: @user
    end

    def update
      @user = User.find(params[:id])
      @user.name = params[:name]
      @user.save
      redirect_to '/#events/' + params[:event_id]
    end

    def show
      @user = User.find(params[:id])

      render json: @user
    end


  end
end