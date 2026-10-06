import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiFetch("/users/me")
      .then((user) => {
        setUsername(user.username || "");
        setBio(user.bio || "");
        setAvatarUrl(user.avatar_url || "");
      })
      .catch(console.error);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await apiFetch("/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          username,
          bio,
          avatar_url: avatarUrl,
        }),
      });

      setMessage("Profile updated!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div>
      <h1>Profile</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>

          <input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
        </div>

        <div>
          <label>Bio</label>

          <textarea
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
          />
        </div>

        <div>
          <label>Avatar URL</label>

          <input
            value={avatarUrl}
            onChange={(e) =>
              setAvatarUrl(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Save profile
        </button>
      </form>
    </div>
  );
}