 
import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!content.trim()) return;

    await onSend(content);

    setContent("");
  }

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a message..."
      />

      <button type="submit">
        Send
      </button>
    </form>
  );
}

