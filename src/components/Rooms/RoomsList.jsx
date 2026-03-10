import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RoomsList() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get('/api/rooms');
      setRooms(res.data);
    } catch (error) {
      console.error('Помилка завантаження кімнат:', error);
    }
  };

  const joinRoom = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div>
      <h2>Доступні кімнати</h2>
      {rooms.length === 0 ? (
        <p>Немає кімнат. Створіть нову!</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              {room.name} (учасників: {room.participants})
              <button onClick={() => joinRoom(room.id)}>Увійти</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}