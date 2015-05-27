class SessionsController < ApplicationController

  def index
    render :index
  end

  def new
    user = User.find_by({email: params[:email]})
    session[:user_id] = user.id

    if user.name == nil
      redirect_to "/name-yo-self/?event_id=#{params[:event_id]}"
      # render a form to enter name
    else
      redirect_to '/#events/' + params[:event_id]
    end

  end
end