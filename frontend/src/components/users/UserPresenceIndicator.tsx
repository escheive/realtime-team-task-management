import React from 'react';

const UserPresenceIndicator: React.FC = () => {
  // Example users
  const users = ['Alice', 'Bob', 'Charlie'];

  return (
    <div className="user-presence">
      <h3>Users Online:</h3>
      <ul>
        {users.map(user => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPresenceIndicator;
