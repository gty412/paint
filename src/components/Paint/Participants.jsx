import { useState, useEffect } from 'react';
import { useSocket } from '../../contexts/SocketContext';

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('participants-update', (users) => {
      setParticipants(users);
    });

    return () => {
      socket.off('participants-update');
    };
  }, [socket]);

  return (
    <div style={{ width: '200px', borderLeft: '1px solid #ccc', padding: '10px' }}>
      <h3>Учасники ({participants.length})</h3>
      <ul>
        {participants.map((p, index) => (
          <li key={index}>{p.email || p.id || 'Анонім'}</li>
        ))}
      </ul>
    </div>
  );
}