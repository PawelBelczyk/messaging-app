class ApplicationController < ActionController::API
  private

  def encode_token(user_id)
    JWT.encode(
      { user_id: user_id, exp: 24.hours.from_now.to_i },
      Rails.application.secret_key_base
    )
  end

  def decoded_token
    auth_header = request.headers["Authorization"]

    return unless auth_header

    token = auth_header.split(" ").last

    JWT.decode(
      token,
      Rails.application.secret_key_base,
      true,
      algorithm: "HS256"
    )
  rescue JWT::DecodeError
    nil
  end

  def current_user
    return unless decoded_token

    user_id = decoded_token[0]["user_id"]

    User.find_by(id: user_id)
  end

  def authenticate_user!
    return if current_user

    render json: {
      error: "Unauthorized"
    }, status: :unauthorized
     return 
 end
end
