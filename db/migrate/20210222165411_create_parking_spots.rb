class CreateParkingSpots < ActiveRecord::Migration[6.0]
  def change
    create_table :parking_spots do |t|
      t.float :latitude
      t.float :longitude
      t.string :address
      t.integer :available_places
      t.integer :total_places

      t.timestamps
    end
  end
end
