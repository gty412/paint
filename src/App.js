import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import RoomsPage from './pages/RoomsPage';
import PaintPage from './pages/PaintPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/room/:roomId" element={<PaintPage />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;