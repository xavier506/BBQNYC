class SessionsController < ApplicationController

  def show
    user = User.find_by({id: session[:user_id]})
    render json: user
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


  def create
    user = User.find(params[:id])
    session[:user_id] = user.id
    # render :new
    redirect_to root_path
  end

end