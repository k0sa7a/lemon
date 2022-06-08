Rails.application.routes.draw do
  get 'errors/not_found'
  get 'errors/internal_server_error'
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :locations do
    resources :list_items, only: [:create]
  end

  resources :list_items, only: [:destroy]

  resources :itineraries

  resources :users

  get '/404', to: 'errors#not_found'
  get '/500', to: 'errors#internal_server'
end
