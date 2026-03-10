import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateRoom() {
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;
    try {
      const res = await axios.post('/api/rooms', { name: roomName });
      navigate(`/room/${res.data.id}`);
    } catch (error) {
      alert('Помилка створення кімнати: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h2>Створити нову кімнату</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Назва кімнати"
          required
        />
        <button type="submit">Створити</button>
      </form>
    </div>
  );
}