class Conversation < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :conversation_members, dependent: :destroy
  has_many :users, through: :conversation_members
end