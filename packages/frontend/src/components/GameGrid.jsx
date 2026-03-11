import { CELL_EMOJI, CELL } from '../game/map.js';

export default function GameGrid({ map, player }) {
  return (
    <div className="grid">
      {map.map((row, y) =>
        row.map((cell, x) => {
          const isPlayer = player.x === x && player.y === y;
          return (
            <span key={`${x}-${y}`} className="cell" title={isPlayer ? player.name : cell}>
              {isPlayer ? CELL_EMOJI.PLAYER : CELL_EMOJI[cell] ?? CELL_EMOJI[CELL.EMPTY]}
            </span>
          );
        })
      )}
    </div>
  );
}
