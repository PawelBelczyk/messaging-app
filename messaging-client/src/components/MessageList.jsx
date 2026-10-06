 
export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message) => (
        <div className="message" key={message.id}>
          <div className="message-name">
            {message.user.username}
          </div>

          <div className="message-content">
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}

