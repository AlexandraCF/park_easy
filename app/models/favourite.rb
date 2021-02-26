class Favourite < ApplicationRecord
  #ajouter validation presence true sur addresse
  validates :address, presence: true
  belongs_to :user
end
