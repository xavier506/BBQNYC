class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.string :hashtag
      t.text :description
      t.date :date
      t.time :time
      t.references :location

      t.timestamps null: false
    end
  end
end
