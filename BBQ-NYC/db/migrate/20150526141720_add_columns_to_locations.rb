class AddColumnsToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :address, :string
    add_column :locations, :hours, :string
    add_column :locations, :location, :string
    add_column :locations, :website, :string
    add_column :locations, :property_id, :string
  end
end
