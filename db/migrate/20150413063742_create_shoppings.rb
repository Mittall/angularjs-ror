class CreateShoppings < ActiveRecord::Migration
  def change
    create_table :shoppings do |t|
      t.integer :user_id
      t.string :product_name
      t.integer :price
      t.integer :quntity

      t.timestamps
    end
  end
end
