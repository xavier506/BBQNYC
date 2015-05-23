class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.text :description
      t.string :photo_url
      t.integer :rating
      t.float :latitude
      t.float :longitude

      t.timestamps null: false
    end
  end
end
