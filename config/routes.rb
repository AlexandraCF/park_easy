Rails.application.routes.draw do
  get 'errors/not_found'
  get 'errors/internal_server_error'
  devise_for :users
  root to: 'pages#home'
  get 'onboarding', to:"pages#onboarding"
  get 'dashboard', to:"pages#dashboard"
  get "update-available-places", to: "parking_spots#update_available_places"
  match "/404", to: "errors#not_found", via: :all
  match "/500", to: "errors#internal_server_error", via: :all

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :parking_spots do
    collection do
      get :closespot
    end
  end
  resources :users
  resources :favourites
end
