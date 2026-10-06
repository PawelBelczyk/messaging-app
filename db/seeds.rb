User.destroy_all
Conversation.destroy_all

users = User.create!([
  {
    username: "Pawel",
    email: "pawel@example.com",
    password: "password"
  },
  {
    username: "Anna",
    email: "anna@example.com",
    password: "password"
  },
  {
    username: "Marek",
    email: "marek@example.com",
    password: "password"
  },
  {
    username: "Julia",
    email: "julia@example.com",
    password: "password"
  }
])

conversation = Conversation.create!

conversation.conversation_members.create!(user: users[0])
conversation.conversation_members.create!(user: users[1])

conversation.messages.create!(
  user: users[1],
  content: "Hej! Jak tam?"
)

conversation.messages.create!(
  user: users[0],
  content: "Wszystko dobrze!"
)