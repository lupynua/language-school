Rails.application.routes.draw do

  root 'application#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :pages
      resources :albums
      resources :pictures
      resources :articles, except: [:new, :edit] do
        get :latest, on: :collection
      end
      resources :events
      resources :menus
    end
  end

  get '/*path', to: 'application#index'
end
