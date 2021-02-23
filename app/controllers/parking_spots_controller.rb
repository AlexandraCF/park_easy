class ParkingSpotsController < ApplicationController
  def index
    @parkingspots = ParkingSpot.all

    # the `geocoded` scope filters only flats with coordinates (latitude & longitude)
    @markers = @parkingspots.geocoded.map do |parkingspot|
      {
        lat: parkingspot.latitude,
        lng: parkingspot.longitude
      }
    end
  end
end
