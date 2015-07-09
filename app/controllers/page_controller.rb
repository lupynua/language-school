class PageController < ApplicationController
  def index
  	@location_path = "/#{params[:path]}"
  end
end