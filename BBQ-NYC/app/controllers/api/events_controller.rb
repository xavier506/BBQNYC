module Api
  class EventsController < ApplicationController

    def create
      event = Event.create({
      name: params[:name], hashtag: params[:hashtag], date: params[:date], time: params[:time], description: params[:description], location_id: params[:location_id]})
      event.save

      render json: event
    end

    def show
      event = Event.find(params[:id])
      render json: event, :include => :location
    end

  end
end