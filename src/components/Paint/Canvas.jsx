import { useRef, useEffect, useState } from 'react';
import { useSocket } from '../../contexts/SocketContext';
import { useParams } from 'react-router-dom';

export default function Canvas({ color, brushSize, tool }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const socket = useSocket();
  const { roomId } = useParams();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.7;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;

    // Білий фон
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [color, brushSize]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('join-room', roomId);

    socket.on('draw-start', (data) => drawFromServer(data, 'start'));
    socket.on('draw-move', (data) => drawFromServer(data, 'move'));
    socket.on('draw-end', () => setDrawing(false));
    socket.on('clear-canvas', clearCanvas);

    return () => {
      socket.off('draw-start');
      socket.off('draw-move');
      socket.off('draw-end');
      socket.off('clear-canvas');
      socket.emit('leave-room', roomId);
    };
  }, [socket, roomId]);

  const drawFromServer = (data, type) => {
    const ctx = ctxRef.current;
    ctx.strokeStyle = data.color;
    ctx.lineWidth = data.brushSize;

    if (type === 'start') {
      ctx.beginPath();
      ctx.moveTo(data.x, data.y);
    } else if (type === 'move') {
      ctx.lineTo(data.x, data.y);
      ctx.stroke();
    }
  };

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);

    socket.emit('draw-start', {
      roomId,
      x: offsetX,
      y: offsetY,
      color,
      brushSize
    });
  };

  const draw = (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();

    socket.emit('draw-move', {
      roomId,
      x: offsetX,
      y: offsetY
    });
  };

  const stopDrawing = () => {
    setDrawing(false);
    socket.emit('draw-end', { roomId });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    socket.emit('clear-canvas', { roomId });
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{ border: '1px solid black', cursor: 'crosshair' }}
    />
  );
}