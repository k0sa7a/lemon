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

  post 'toggle_favorite', to: "locations#toggle_favorite"

  resources :itineraries do
    resources :list_items, only: [:update]
  end

  resources :users do
    resources :notifications
  end

  # resources :notifications, only: [:show]

  resources :meetings

  resources :chatrooms, only: :show do
    resources :messages, only: :create
  end

  resources :events


  resources :coaches, only: [:new, :create, :index, :show] do
    resources :appointments, only: [:new, :create]
  end


  get '/404', to: 'errors#not_found'
  get '/500', to: 'errors#internal_server'
end
