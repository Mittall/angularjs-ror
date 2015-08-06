class Product < ActiveRecord::Base
  belongs_to :category
	validates :pname, :presence => true
	validates :price, :presence => true
end
