module Api
  class RsvpsController < ApplicationController

    def index
      @rsvps = Rsvp.where({event_id: params[:event_id]})
      render json: @rsvps
    end

    def create
      @rsvp = Rsvp.create({user_id: params[:user_id], event_id: params[:event_id]})
      @user = User.find(params[:user_id])
      @event = Event.find(params[:event_id])
      @link = "http://localhost:3000/login?email=" + @user.email + "&" + @event.id.to_s
      UserNotifier.send_rsvp_email(@user, @event, @link).deliver
      render json: @rsvp
    end

    def update
      @rsvp = Rsvp.find(params[:id])
      @rsvp.rsvp = params[:rsvp]

      @rsvp.save
      render json: @rsvp
    end

    def show
      @rsvp = Rsvp.find_by({event_id: params[:event_id]})
      render json: @rsvp
    end

  end
end
