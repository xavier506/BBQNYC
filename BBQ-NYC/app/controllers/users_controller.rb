class UsersController < ApplicationController

  def name
    @user = User.find_by({email: params[:email]})
    render :name
  end

  def update

    # user = User.find_by({email: params[:email]})
    # name = 
    # # user.save
  end

end