class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    users = User
      .where.not(id: current_user.id)
      .select(:id, :username, :avatar_url, :bio)

    render json: users
  end

  def show
    user = User.find(params[:id])

    render json: user.slice(
      :id,
      :username,
      :avatar_url,
      :bio
    )
  end

  def me
    render json: current_user
  end

  def update
    if current_user.update(user_params)
      render json: current_user
    else
      render json: {
        errors: current_user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(
      :username,
      :avatar_url,
      :bio
    )
  end
end