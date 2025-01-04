import React from 'react';
import './profile.css';
import users from '../../_DATA'; 

const Profile = () => {
  const userArray = Object.values(users); 
  return (
    <div className="profile-container">
      {userArray.map((user) => (
        <div key={user.id} className="avatar">
          <img src={user.avatarURL} alt={user.name} />
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
