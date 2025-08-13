import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ExplorePage from './pages/ExplorePage';
import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';

export default function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/explore" element={<ExplorePage token={token} />} />
        <Route path="/chat" element={<ChatPage token={token} />} />
        <Route path="*" element={<Navigate to="/explore" />} />
      </Routes>
    </BrowserRouter>
  );
}
