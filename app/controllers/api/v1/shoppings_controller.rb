class Api::V1::ShoppingsController < Api::V1::BaseController

  def create
    @shopping = Shopping.new(shopping_params)
    qty = shopping_params[:quntity].to_i
    if qty > 1 
      values = { 
        :business => 'mittal.vitrainee@gmail.com',
        :cmd => '_cart',
        :upload => 1,
        :return => api_userCart_url
      }	
   	  values.merge!({
        "amount_1" => shopping_params[:price],
        "item_name_1" => 'abcs',
        "item_number_1" => 1,
        "quantity_1" => 1
      })  
  		respond_with @shopping, :location => "https://www.sandbox.paypal.com/cgi-bin/webscr?" + values.to_query
    else
      return #respond_with @shopping.errors, :location => api_shoppings_path
    end
  end

  def userCart
    @shopping = Shopping.new(shopping_params)
    #@shopping.user_id = current_user.id
    if @shopping.save
      respond_with @shopping, :location => api_shoppings_path
    else
      respond_with @shopping.errors, :location => api_shoppings_path
    end
  end

  private
  def shopping_params
    params.require(:shopping).permit!
  end
end
