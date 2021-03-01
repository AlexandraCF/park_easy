Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get 'onboarding', to:"pages#onboarding"
  get 'dashboard', to:"pages#dashboard"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :parking_spots do
    collection do
      get :closespot
    end
  end
  resources :users
  resources :favourites
end
