class AuthController < ApplicationController
  def register
    user = User.new(user_params)

    if user.save
      token = encode_token(user.id)

      render json: {
        token: token,
        user: user
      }, status: :created
    else
      render json: {
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(
      email: params[:email]
    )

    if user&.authenticate(params[:password])
      token = encode_token(user.id)

      render json: {
        token: token,
        user: user
      }
    else
      render json: {
        error: "Invalid email or password"
      }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(
      :username,
      :email,
      :password,
      :password_confirmation
    )
  end
end