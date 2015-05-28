class UsersController < ApplicationController

  def name
    @user = User.find(session[:user_id])
    @event = Event.find(params[:event_id])
    render :name
  end

  def update
    @user = User.find(params[:id])
    @user.name = params[:name]
    @user.save
    redirect_to '/#events/' + params[:event_id] + '/users/' + @user.id
  end

end