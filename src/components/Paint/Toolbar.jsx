export default function Toolbar({ color, setColor, brushSize, setBrushSize, clearCanvas }) {
  return (
    <div style={{ display: 'flex', gap: '10px', padding: '10px', alignItems: 'center' }}>
      <label>
        Колір:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <label>
        Товщина:
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
        />
        <span>{brushSize}</span>
      </label>
      <button onClick={clearCanvas}>Очистити все</button>
    </div>
  );
}