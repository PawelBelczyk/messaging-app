import { apiFetch } from "./api";

export function getConversations() {
  return apiFetch("/conversations");
}

export function getConversation(id) {
  return apiFetch(`/conversations/${id}`);
}

export function createConversation(userId) {
  return apiFetch("/conversations", {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
    }),
  });
}