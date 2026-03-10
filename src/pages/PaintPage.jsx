import Canvas from '../components/Paint/Canvas';
import Toolbar from '../components/Paint/Toolbar';
import Participants from '../components/Paint/Participants';

export default function PaintPage() {
  const { roomId } = useParams();
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState('pencil'); // pencil, line, rect, circle

  return (
    <SocketProvider>
      <div>
        <h2>Кімната: {roomId}</h2>
        <Toolbar
          color={color}
          setColor={setColor}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          clearCanvas={() => {}} // передайте сюди функцію очищення з Canvas (через ref або context)
        />
        <div style={{ display: 'flex' }}>
          <Canvas
            color={color}
            brushSize={brushSize}
            tool={tool}
          />
          <Participants />
        </div>
      </div>
    </SocketProvider>
  );
}