import { apiFetch } from "./api";

export function getMessages(conversationId) {
  return apiFetch(
    `/conversations/${conversationId}/messages`
  );
}

export function sendMessage(
  conversationId,
  content
) {
  return apiFetch(
    `/conversations/${conversationId}/messages`,
    {
      method: "POST",
      body: JSON.stringify({
        content,
      }),
    }
  );
}