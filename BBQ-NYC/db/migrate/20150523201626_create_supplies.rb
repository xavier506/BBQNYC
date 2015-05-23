class CreateSupplies < ActiveRecord::Migration
  def change
    create_table :supplies do |t|
      t.string :name
      t.references :user
      t.references :event

      t.timestamps null: false
    end
  end
end
