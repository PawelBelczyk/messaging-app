 
export default function UserList({ users, onSelectUser }) {
  return (
    <div>
      {users.map((user) => (
        <button
          className="user-button"
          key={user.id}
          onClick={() => onSelectUser(user)}
        >
          {user.username}
        </button>
      ))}
    </div>
  );
}

