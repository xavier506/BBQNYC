class ChangeUserEventsToRsvPs < ActiveRecord::Migration
  def change
    rename_table :user_events, :rsvps
  end
end
