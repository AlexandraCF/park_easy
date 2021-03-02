class Favourite < ApplicationRecord
  #ajouter validation presence true sur addresse
  validates :address, presence: true
  belongs_to :user

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end
