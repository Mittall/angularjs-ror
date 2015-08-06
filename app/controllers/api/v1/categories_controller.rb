class Api::V1::CategoriesController < Api::V1::BaseController

  def create
    @category = Category.new(category_params)
    if @category.save
      respond_with @category, :location => api_products_path
    else
      respond_with @category.errors, :location => api_products_path
    end
  end

  def index
    respond_with Category.all
  end

  private

  def category_params
    params.require(:category).permit(:cname)
  end

end
