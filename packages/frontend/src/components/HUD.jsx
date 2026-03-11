const MAX_HP = 10;

export default function HUD({ player, floor }) {
  const hearts = Array.from({ length: MAX_HP }, (_, i) => i < player.hp ? '❤️' : '🖤');

  return (
    <div className="hud">
      <span className="hud-name">🧙 {player.name}</span>
      <span className="hud-hp">{hearts.join('')}</span>
      <span className="hud-gold">💰 {player.gold}</span>
      <span className="hud-floor">Floor {floor}</span>
    </div>
  );
}
