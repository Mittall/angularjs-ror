class Api::V1::ProductsController < Api::V1::BaseController

  def create
    @product = Product.new(product_params)
    if @product.save
      respond_with @product, :location => api_products_path
    else
      respond_with @product.errors, :location => api_products_path
    end
  end
    
  def index
    respond_with Product.all
  end

  def edit
  end

  def update
    @product = Product.update(params[:id], product_params)
    if @product.present?
      respond_with :api, @product
    else
      render :json => {:errors => @product.errors}, :status => 401
    end
  end
    
  def show
    respond_with :api, Product.find(params[:id])
  end

  def destroy
    respond_with :api, Product.find(params[:id]).destroy
  end

  private

  def product_params
    params.require(:product).permit(:pname, :price, :category_id)
  end

end
