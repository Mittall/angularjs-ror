class CreateCities < ActiveRecord::Migration
  def change
    create_table :cities do |t|
      t.string :cname
      t.string :description
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
