 
import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

import UserList from "../components/UserList";
import ConversationList from "../components/ConversationList";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

import {
  createConversation,
  getConversations,
} from "../api/conversations";

import {
  getMessages,
  sendMessage,
} from "../api/messages";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  useEffect(() => {
    apiFetch("/users")
      .then(setUsers)
      .catch(console.error);
  }, []);

  useEffect(() => {
    apiFetch("/conversations")
      .then(setConversations)
      .catch(console.error);
  }, []);

  async function handleSelectUser(user) {
    try {
      const existingConversation = conversations.find(
        (conversation) =>
          conversation.user &&
          conversation.user.id === user.id
      );

      if (existingConversation) {
        setActiveConversation(existingConversation);

        const messages = await getMessages(
          existingConversation.id
        );

        setMessages(messages);
        return;
      }

      setActiveConversation({
        id: null,
        user: user,
        isNew: true,
      });

      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSelectConversation(conversation) {
    try {
      setActiveConversation(conversation);

      const messages = await getMessages(
        conversation.id
      );

      setMessages(messages);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSendMessage(content) {
    if (!activeConversation) return;

    try {
      let conversation = activeConversation;

      if (activeConversation.isNew) {
        conversation = await createConversation(
          activeConversation.user.id
        );

        setActiveConversation(conversation);
      }

      const message = await sendMessage(
        conversation.id,
        content
      );

      setMessages((current) => [
        ...current,
        message,
      ]);

      const updatedConversations =
        await getConversations();

      setConversations(updatedConversations);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="messaging-app">
      <header className="app-header">
        <div className="app-brand">
          <div className="app-logo">M</div>

          <h1>Messaging App</h1>
        </div>

        <div className="app-actions">
          <a
            className="profile-link"
            href="/profile"
          >
            Profile
          </a>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="messaging-layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h2>Conversations</h2>

            <ConversationList
              conversations={conversations}
              onSelectConversation={
                handleSelectConversation
              }
            />
          </div>

          <div className="sidebar-section">
            <h2>Users</h2>

            <UserList
              users={users}
              onSelectUser={handleSelectUser}
            />
          </div>
        </aside>

        <section className="chat">
          {activeConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-user-avatar">
                  {activeConversation.user?.username
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h2>
                    {activeConversation.user?.username ||
                      `Conversation ${activeConversation.id}`}
                  </h2>

                  <span className="chat-status">
                    Active conversation
                  </span>
                </div>
              </div>

              <div className="chat-messages">
                <MessageList messages={messages} />
              </div>

              <MessageInput
                onSend={handleSendMessage}
              />
            </>
          ) : (
            <div className="empty-chat">
              <div className="empty-chat-icon">M</div>

              <h2>Your messages</h2>

              <p>
                Select a conversation or choose a user
                to start chatting.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

