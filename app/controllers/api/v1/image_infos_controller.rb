require 'hashie'
class Api::V1::ImageInfosController < Api::V1::BaseController
  include Hashie::Extensions::Mash::SafeAssignment

  def create
    # If form containing other data means table contain other field then below two line is needed we have to uncomment it.
    #imageData = JSON.parse(params[:image_info])
    #imageData_obj = Hashie::Mash.new imageData

    @image_info = ImageInfo.new
    @image_info.file = params[:file] 

    if @image_info.save
      respond_with @image_info, :location => api_image_infos_path
    else
      respond_with @image_info.errors, :location => api_image_infos_path
    end 

  end

  def index
    respond_with ImageInfo.all
  end

  def update
    @image_info = ImageInfo.update(params[:id], image_info_params)
    if @image_info.present?
      respond_with :api, @image_info
    else
      render :json => {:errors => @image_info.errors}, :status => 401
    end
  end

  private

  def image_info_params
    params.require(:image_info).permit(:file)
  end

end

=begin
def create

    #return render :text => params[:user].inspect
     #return render :text => JSON.parse(params[:user]).inspect 
      
      mydata = JSON.parse(params[:user])
      mydata_obj = Hashie::Mash.new mydata
      #hash = JSON.parse(params[:user], symbolize_names: true)
      #return render :text => mydata_obj.inspect

    
      #hash = {}
      #user_obj = mydata.to_hash
      #return render :text => user_obj.inspect
            
      
      #myhash = mydata.each { |k, v| puts "Key: #{k}, Value: #{v}" }
      #return render :text => mydata["firstName"].inspect

    @user = User.new
    @user.first_name = mydata["firstName"]
    @user.last_name  = mydata["lastName"]
    @user.email = mydata["email"]
    @user.password = mydata["password"]
    @user.address = mydata["address"]
    @user.birthdate = mydata["birthdate"]
    @user.avatar = params["avatar"] 
   # return render :text => @user.inspect
    @user.skip_confirmation!
    if @user.save
      sign_in(@user)
      respond_with @user, :location => api_users_path
    else
      respond_with @user.errors, :location => api_users_path
    end
  end
=end
