class ParkingSpotsController < ApplicationController
  def index

    @parkingspots = ParkingSpot.all

    # the `geocoded` scope filters only parkingspots with coordinates (latitude & longitude)
    @markers = @parkingspots.geocoded.map do |parkingspot|
      {
        lat: parkingspot.latitude,
        lng: parkingspot.longitude,
        'marker-symbol': 2,
        infoWindow: render_to_string(partial: "info_window", locals: { parkingspot: parkingspot }),
        image_url: helpers.asset_url('map_marker_solid.svg'),
        available_spaces: parkingspot.available_places,
        parking_spot_id: parkingspot.id
      }
    end
  end

  def update_available_places
    parking_spot = ParkingSpot.find(params[:id])

    if params[:do] == "plus"
      render json: parking_spot
    end
  end
end
