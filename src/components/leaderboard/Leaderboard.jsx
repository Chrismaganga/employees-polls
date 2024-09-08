
// export default Leaderboard;
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
            {/* Ensure avatarURL is correct or fallback to a default image */}
            <img
              src={user.avatarURL || '/images/default-avatar.png'}
              alt={`Avatar of ${user.name}`}
              onError={(e) => { e.target.onerror = null; e.target.src = '/images/default-avatar.png'; }} // Fallback in case of error
            />
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
