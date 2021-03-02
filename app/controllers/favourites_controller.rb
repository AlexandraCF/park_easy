class FavouritesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  
  def index
    @favourites = Favourite.all
  end

  def new
    @favourite = Favourite.new
  end

  def show
    @favourite = Favourite.find(params[:id])
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
  
  def destroy
    @favourite = Favourite.find(params[:id])
    @favourite.destroy
    redirect_to parking_spots_path
  end


  private

  def favourite_params
  params.require(:favourite).permit(:address, :longitude, :latitude)
  end

end
  

  