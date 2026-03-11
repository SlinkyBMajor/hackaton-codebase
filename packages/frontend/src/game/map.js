export const CELL = {
  EMPTY: 'EMPTY',
  WALL: 'WALL',
  MONSTER: 'MONSTER',
  TREASURE: 'TREASURE',
  POTION: 'POTION',
  STAIRS: 'STAIRS',
  // TODO (workshop): add SHOP cell type
};

export const CELL_EMOJI = {
  EMPTY: '⬛',
  WALL: '🧱',
  MONSTER: '👹',
  TREASURE: '💰',
  POTION: '🧪',
  STAIRS: '🪜',
  PLAYER: '🧙',
  // TODO (workshop): add SHOP emoji (🏪)
};

// 14x14 dungeon map
// W = Wall, M = Monster, T = Treasure, P = Potion, S = Stairs, . = Empty
const MAP_TEMPLATE = [
  'WWWWWWWWWWWWWW',
  'W....M....T..W',
  'W.WW.....WW..W',
  'W.W..M.M..W..W',
  'W....W....P..W',
  'W.M..W.WW....W',
  'W....T....M..W',
  'W.WWWW...WW..W',
  'W..M.....T...W',
  'W.W..P.M.W...W',
  'W.W.WW...W.M.W',
  'W....T.M.....W',
  'WT...M....P..S',
  'WWWWWWWWWWWWWW',
];

const CHAR_TO_CELL = {
  W: CELL.WALL,
  M: CELL.MONSTER,
  T: CELL.TREASURE,
  P: CELL.POTION,
  S: CELL.STAIRS,
  '.': CELL.EMPTY,
};

export const PLAYER_START = { x: 1, y: 1 };

export function createMap() {
  return MAP_TEMPLATE.map((row) =>
    row.split('').map((char) => CHAR_TO_CELL[char] ?? CELL.EMPTY)
  );
}

export const MAP_ROWS = MAP_TEMPLATE.length;
export const MAP_COLS = MAP_TEMPLATE[0].length;
