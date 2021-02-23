class ParkingSpotsController < ApplicationController
  def index
    @parkingspots = ParkingSpot.all

    # the `geocoded` scope filters only parkingspots with coordinates (latitude & longitude)
    @markers = @parkingspots.geocoded.map do |parkingspot|
      {
        lat: parkingspot.latitude,
        lng: parkingspot.longitude,
        'marker-symbol': 2,
        infoWindow: render_to_string(partial: "info_window", locals: { parkingspot: parkingspot })
      }
    end
  end
end
