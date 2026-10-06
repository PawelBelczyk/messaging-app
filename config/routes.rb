Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  
post "/register", to: "auth#register"
post "/login", to: "auth#login"


get "/users", to: "users#index"
get "/users/me", to: "users#me"
get "/users/:id", to: "users#show"
patch "/users/me", to: "users#update"

resources :conversations, only: [:index, :show, :create] do
  resources :messages, only: [:index, :create]
end

end
