class User < ApplicationRecord
  has_secure_password

  has_many :messages, dependent: :destroy
  has_many :conversation_members, dependent: :destroy
  has_many :conversations, through: :conversation_members
  has_many :friendships, dependent: :destroy
end