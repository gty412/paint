import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) navigate('/auth');
    fetchRooms();
  }, [token]);

  const fetchRooms = async () => {
    const res = await axios.get('/api/rooms');
    setRooms(res.data);
  };

  const createRoom = async () => {
    if (!newRoomName.trim()) return;
    const res = await axios.post('/api/rooms', { name: newRoomName });
    navigate(`/room/${res.data.id}`);
  };

  return (
    <div>
      <h1>Кімнати</h1>
      <div>
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="Назва нової кімнати"
        />
        <button onClick={createRoom}>Створити</button>
      </div>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.name} (учасників: {room.participants})
            <button onClick={() => navigate(`/room/${room.id}`)}>Увійти</button>
          </li>
        ))}
      </ul>
    </div>
  );
}