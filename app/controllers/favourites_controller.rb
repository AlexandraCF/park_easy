class FavouritesController < ApplicationController

  def index
    @favourites = Favourite.all
  end

  def new
    @favourite = Favourite.new
  end
end
  
