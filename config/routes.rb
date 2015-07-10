Rails.application.routes.draw do
  root 'application#index'
 
  namespace :api do
    namespace :v1 do
      resources :albums 
      resources :pictures
    end
  end

 get '/*path', to: 'application#index'

end
