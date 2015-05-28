module Api
  class RsvpsController < ApplicationController

    def index
      @rsvps = Rsvp.where({event_id: params[:event_id]})
      render json: @rsvps
    end

    def create
      @rsvp = Rsvp.create({user_id: params[:user_id], event_id: params[:event_id]})
      render json: @rsvp
    end

    def update
      @rsvp = Rsvp.find_by({user_id: params[:id], event_id: params[:event_id]})
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
