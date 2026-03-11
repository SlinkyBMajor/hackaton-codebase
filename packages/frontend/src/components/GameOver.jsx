import { useState, useEffect } from 'react';

export default function GameOver({ player, floor, onRestart, onLeaderboard }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const score = player.gold * floor * 10;

  useEffect(() => {
    submitScore();
  }, []);

  async function submitScore() {
    setSubmitting(true);
    try {
      await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: player.name, score, gold: player.gold, floor }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="screen gameover-screen">
      <h1>💀 Game Over</h1>
      <p className="gameover-name">{player.name}</p>
      <div className="gameover-stats">
        <div className="stat"><span>Gold</span><strong>💰 {player.gold}</strong></div>
        <div className="stat"><span>Floor</span><strong>🪜 {floor}</strong></div>
        <div className="stat"><span>Score</span><strong>⭐ {score}</strong></div>
      </div>
      {submitting && <p className="status">Submitting score…</p>}
      {submitted && <p className="status success">Score saved! ✅</p>}
      <div className="gameover-actions">
        <button className="btn btn-primary" onClick={onRestart}>Play Again</button>
        <button className="btn btn-secondary" onClick={onLeaderboard}>🏆 Leaderboard</button>
      </div>
    </div>
  );
}
