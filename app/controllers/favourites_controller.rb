class FavouritesController < ApplicationController

  def index
    @favourites = Favourite.all
  end

  def new
    @favourite = Favourite.new
  end

  def create
    @favourite = Favourite.new(favourite_params)
    @favourite.user = current_user
      if @favourite.save
        redirect_to parking_spots_path
      else
        render :new
      end
  end

  private

  def favourite_params
  params.require(:favourite).permit(:address, :longitude, :latitude)
  end

end
  
