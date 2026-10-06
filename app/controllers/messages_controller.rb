class MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    conversation = current_user.conversations.find(
      params[:conversation_id]
    )

    messages = conversation
      .messages
      .includes(:user)
      .order(:created_at)

    render json: messages.as_json(
      include: {
        user: {
          only: [:id, :username, :avatar_url]
        }
      }
    )
  end

  def create
    conversation = current_user.conversations.find(
      params[:conversation_id]
    )

    message = conversation.messages.build(
      message_params
    )

    message.user = current_user

    if message.save
      render json: message.as_json(
        include: {
          user: {
            only: [:id, :username, :avatar_url]
          }
        }
      ), status: :created
    else
      render json: {
        errors: message.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.permit(:content)
  end
end