import './Leaderboard.css';

import { useSelector } from 'react-redux';

const Leaderboard = () => {
  const users = useSelector((state) => state.users);

  const leaderboard = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      questions: user.questions.length,
      answers: Object.keys(user.answers).length,
      total: user.questions.length + Object.keys(user.answers).length,
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="leaderboard">
      <h3>Leaderboard</h3>
      <ul>
        {leaderboard.map((user) => (
          <li key={user.id}>
            <img src={user.avatarURL} alt={`Avatar of ${user.name}`} />
            <h4>{user.name}</h4>
            <p>Questions Created: {user.questions}</p>
            <p>Answers: {user.answers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
