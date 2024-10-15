import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ErrorBoundary from './components/ErrorBoundary';
import { auth } from './services/firebase';
import { User } from 'firebase/auth';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <Routes>
              <Route path="/login" element={
                user ? <Navigate to="/" /> : <Login />
              } />
              <Route path="/" element={
                user ? <Home onLogout={handleLogout} /> : <Navigate to="/login" />
              } />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;