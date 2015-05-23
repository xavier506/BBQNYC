class CreateUserEvents < ActiveRecord::Migration
  def change
    create_table :user_events do |t|
      t.references :event
      t.references :user
      t.boolean :rsvp, default: nil

      t.timestamps null: false
    end
  end
end
