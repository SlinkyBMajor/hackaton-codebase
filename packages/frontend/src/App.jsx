import { useState, useEffect, useCallback } from 'react';
import GameGrid from './components/GameGrid.jsx';
import HUD from './components/HUD.jsx';
import GameOver from './components/GameOver.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import { createMap, CELL, PLAYER_START } from './game/map.js';

const INITIAL_HP = 10;

function createInitialState(name) {
  return {
    map: createMap(),
    player: { ...PLAYER_START, hp: INITIAL_HP, gold: 0, name },
    floor: 1,
    log: ['You enter the dungeon. Good luck! 🗡️'],
    gameOver: false,
    won: false,
  };
}

export default function App() {
  const [screen, setScreen] = useState('start'); // 'start' | 'game' | 'gameover' | 'leaderboard'
  const [playerName, setPlayerName] = useState('');
  const [state, setState] = useState(null);

  const addLog = (msg, prev) => ({
    ...prev,
    log: [msg, ...prev.log].slice(0, 5),
  });

  const handleMove = useCallback(
    (dx, dy) => {
      if (!state || state.gameOver) return;

      setState((prev) => {
        const { player, map } = prev;
        const nx = player.x + dx;
        const ny = player.y + dy;

        if (ny < 0 || ny >= map.length || nx < 0 || nx >= map[0].length) return prev;

        const target = map[ny][nx];

        if (target === CELL.WALL) return prev;

        const newMap = map.map((row) => [...row]);
        let newPlayer = { ...player, x: nx, y: ny };
        let next = { ...prev, map: newMap, player: newPlayer };

        if (target === CELL.MONSTER) {
          const damage = Math.floor(Math.random() * 3) + 1;
          newPlayer.hp -= damage;
          newMap[ny][nx] = CELL.EMPTY;
          next = addLog(`⚔️ You slay the monster! Lost ${damage} HP.`, { ...next, player: newPlayer });
          if (newPlayer.hp <= 0) {
            next = { ...next, player: { ...newPlayer, hp: 0 }, gameOver: true };
            return next;
          }
        } else if (target === CELL.TREASURE) {
          const gold = Math.floor(Math.random() * 15) + 10;
          newPlayer.gold += gold;
          newMap[ny][nx] = CELL.EMPTY;
          next = addLog(`💰 Found ${gold} gold!`, { ...next, player: newPlayer });
        } else if (target === CELL.POTION) {
          const heal = Math.floor(Math.random() * 3) + 2;
          newPlayer.hp = Math.min(INITIAL_HP, newPlayer.hp + heal);
          newMap[ny][nx] = CELL.EMPTY;
          next = addLog(`🧪 Drank a potion. Restored ${heal} HP!`, { ...next, player: newPlayer });
        } else if (target === CELL.STAIRS) {
          next = addLog(`🪜 Descending to floor ${prev.floor + 1}…`, next);
          next = { ...next, map: createMap(), player: { ...newPlayer, x: PLAYER_START.x, y: PLAYER_START.y }, floor: prev.floor + 1 };
        }
        // TODO (workshop): handle CELL.SHOP — open a shop modal

        return { ...next, player: newPlayer, map: newMap };
      });
    },
    [state]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (screen !== 'game') return;
      const moves = {
        ArrowUp: [0, -1], w: [0, -1], W: [0, -1],
        ArrowDown: [0, 1], s: [0, 1], S: [0, 1],
        ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0],
        ArrowRight: [1, 0], d: [1, 0], D: [1, 0],
      };
      const move = moves[e.key];
      if (move) {
        e.preventDefault();
        handleMove(...move);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [screen, handleMove]);

  useEffect(() => {
    if (state?.gameOver) {
      setScreen('gameover');
    }
  }, [state?.gameOver]);

  function startGame() {
    if (!playerName.trim()) return;
    setState(createInitialState(playerName.trim()));
    setScreen('game');
  }

  if (screen === 'start') {
    return (
      <div className="screen start-screen">
        <h1>🧙 Dungeon Sprint</h1>
        <p className="subtitle">Navigate the dungeon. Slay monsters. Collect gold.</p>
        <div className="legend">
          <span>🧱 Wall</span>
          <span>👹 Monster (-HP)</span>
          <span>💰 Treasure (+Gold)</span>
          <span>🧪 Potion (+HP)</span>
          <span>🪜 Stairs (next floor)</span>
        </div>
        <div className="start-form">
          <input
            className="name-input"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && startGame()}
            maxLength={20}
            autoFocus
          />
          <button className="btn btn-primary" onClick={startGame} disabled={!playerName.trim()}>
            Enter Dungeon
          </button>
        </div>
        <button className="btn btn-ghost" onClick={() => setScreen('leaderboard')}>
          🏆 Leaderboard
        </button>
      </div>
    );
  }

  if (screen === 'game' && state) {
    return (
      <div className="screen game-screen">
        <HUD player={state.player} floor={state.floor} />
        <GameGrid map={state.map} player={state.player} />
        <div className="log">
          {state.log.map((msg, i) => (
            <div key={i} className={`log-entry ${i === 0 ? 'log-latest' : ''}`}>{msg}</div>
          ))}
        </div>
        <div className="controls-hint">Move: ↑↓←→ or WASD</div>
      </div>
    );
  }

  if (screen === 'gameover' && state) {
    return (
      <GameOver
        player={state.player}
        floor={state.floor}
        onRestart={() => {
          setState(createInitialState(playerName));
          setScreen('game');
        }}
        onLeaderboard={() => setScreen('leaderboard')}
      />
    );
  }

  if (screen === 'leaderboard') {
    return (
      <Leaderboard onBack={() => setScreen(state ? 'gameover' : 'start')} />
    );
  }

  return null;
}
