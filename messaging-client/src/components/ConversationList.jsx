 
export default function ConversationList({
  conversations,
  onSelectConversation,
}) {
  return (
    <div>
      {conversations.map((conversation) => (
        <button
          className="conversation-button"
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
        >
          <strong>
            {conversation.user?.username || "Unknown user"}
          </strong>

          {conversation.last_message && (
            <div>
              {conversation.last_message}
            </div>
          )}
        </button>
      ))}
    </div>
  );
}

