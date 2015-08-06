class CreateImageInfos < ActiveRecord::Migration
  def change
    create_table :image_infos do |t|
      t.attachment :file

      t.timestamps
    end
  end
end
