# 🧙 Dungeon Sprint

A tiny grid-based dungeon crawler. Navigate the dungeon, slay monsters, collect gold, and see how far you can go.

## Stack

| Package | Tech |
|---------|------|
| `packages/frontend` | React + Vite |
| `packages/backend` | Node.js + Express |

## Getting started

```bash
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## How to play

| Key | Action |
|-----|--------|
| ↑ / W | Move up |
| ↓ / S | Move down |
| ← / A | Move left |
| → / D | Move right |

### Tiles

| Tile | Meaning |
|------|---------|
| 🧙 | You |
| 🧱 | Wall (impassable) |
| 👹 | Monster (lose HP, clear the tile) |
| 💰 | Treasure (gain gold) |
| 🧪 | Potion (restore HP) |
| 🪜 | Stairs (go to next floor) |

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/scores` | Get top 10 scores |
| `POST` | `/api/scores` | Submit a score |

---

## Workshop feature: The Shop 🏪

Your task is to add a **shop** that players can visit inside the dungeon.

### What to build

**Backend** (`packages/backend`)
- Create `src/routes/shop.js` with:
  - `GET /api/shop` — return a list of items for sale (e.g. HP Potion for 15 gold, Max HP Upgrade for 30 gold)
  - `POST /api/shop/buy` — validate the purchase and return the updated player state
- Register the route in `src/index.js` (the TODO comment is already there)

**Frontend** (`packages/frontend`)
- Add `SHOP` to the `CELL` and `CELL_EMOJI` maps in `src/game/map.js`
- Place a `S` tile somewhere in the map template (there's a TODO comment)
- Handle `CELL.SHOP` in the `handleMove` function in `App.jsx` to open a shop modal
- Create `src/components/Shop.jsx` — a modal that fetches items from the backend and lets the player spend gold

### Hints

- The shop should close when the player moves away, or on a "Leave" button
- A purchase should deduct gold from the player and apply the effect (restore HP, increase max HP, etc.)
- Keep it simple — no server-side session needed, the frontend holds the player state
