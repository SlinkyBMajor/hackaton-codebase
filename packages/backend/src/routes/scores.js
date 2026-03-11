const express = require('express');
const router = express.Router();

// In-memory leaderboard (resets on server restart)
let scores = [
  { id: 1, name: 'Gandalf', score: 420, gold: 42, floor: 3, createdAt: new Date().toISOString() },
  { id: 2, name: 'Legolas', score: 310, gold: 31, floor: 2, createdAt: new Date().toISOString() },
  { id: 3, name: 'Gimli', score: 280, gold: 28, floor: 2, createdAt: new Date().toISOString() },
];
let nextId = 4;

// GET top 10 scores
router.get('/', (req, res) => {
  const top10 = [...scores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json(top10);
});

// POST submit a score
router.post('/', (req, res) => {
  const { name, score, gold, floor } = req.body;

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'name and score are required' });
  }

  const entry = {
    id: nextId++,
    name: name.trim().slice(0, 20) || 'Anonymous',
    score,
    gold: gold ?? 0,
    floor: floor ?? 1,
    createdAt: new Date().toISOString(),
  };

  scores.push(entry);
  res.status(201).json(entry);
});

module.exports = router;
