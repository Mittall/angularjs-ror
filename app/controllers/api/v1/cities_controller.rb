class Api::V1::CitiesController < Api::V1::BaseController

  def index
    respond_with City.all
  end

  private

  def city_params
    params.require(:city).permit(:cname, :description, :latitude, :longitude)
  end
end
