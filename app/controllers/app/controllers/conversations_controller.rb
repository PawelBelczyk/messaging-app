  
class ConversationsController < ApplicationController
  before_action :authenticate_user!

  def index
    conversations = current_user.conversations.includes(:users, :messages)

    render json: conversations.map { |conversation| conversation_json(conversation) }
  end

  def show
    conversation = current_user.conversations.find(params[:id])

    render json: conversation_json(conversation)
  end

  def create
    other_user = User.find(params[:user_id])

    conversation = Conversation
      .joins(:conversation_members)
      .where(conversation_members: { user_id: current_user.id })
      .joins(:conversation_members)
      .where(conversation_members: { user_id: other_user.id })
      .first

    unless conversation
      conversation = Conversation.create!

      ConversationMember.create!(
        conversation: conversation,
        user: current_user
      )

      ConversationMember.create!(
        conversation: conversation,
        user: other_user
      )
    end

    render json: conversation_json(conversation), status: :created
  end

  private

  def conversation_json(conversation)
    other_user = conversation.users.find { |user| user.id != current_user.id }
    last_message = conversation.messages.order(created_at: :desc).first

    {
      id: conversation.id,
      user: other_user&.slice(:id, :username, :avatar_url),
      last_message: last_message&.content
    }
  end
end

