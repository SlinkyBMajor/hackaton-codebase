import { useState, useEffect } from 'react';

export default function Leaderboard({ onBack }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/scores')
      .then((r) => r.json())
      .then(setScores)
      .catch(() => setError('Could not load scores'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="screen leaderboard-screen">
      <h1>🏆 Leaderboard</h1>
      {loading && <p className="status">Loading…</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && (
        <table className="scores-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
              <th>Gold</th>
              <th>Floor</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={s.id} className={i === 0 ? 'top-score' : ''}>
                <td>{i === 0 ? '👑' : i + 1}</td>
                <td>{s.name}</td>
                <td>⭐ {s.score}</td>
                <td>💰 {s.gold}</td>
                <td>🪜 {s.floor}</td>
              </tr>
            ))}
            {scores.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>No scores yet. Be the first!</td></tr>
            )}
          </tbody>
        </table>
      )}
      <button className="btn btn-ghost" onClick={onBack}>← Back</button>
    </div>
  );
}
