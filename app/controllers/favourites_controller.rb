class FavouritesController < ApplicationController

  def index
    @favourites = Favourite.all
  end

  def new
    @user = User.find(params[:user_id])
    @favourite = Favourite.new
  end

  def create
    @favourite = Favourite.new(favourite_params)
    @user = User.find(params[:user_id])
    @favourite.user = @user
    if @favourite.save
      redirect_to_dashboard_path
    else
      render :new
    end
  end

  private

  def favourite_params
  params.require(:favourite).permit(:address, :longitude, :latitude)
  end

end
  
