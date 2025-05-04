import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserProvider from './context/UserContext';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import CountryDetails from './pages/CountryDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Favorites from './pages/Favorites';
import { Container } from 'react-bootstrap';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <UserProvider>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:code" element={<CountryDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="bg-dark text-white py-3 mt-5">
          <Container className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Countries Explorer App
            </p>
          </Container>
        </footer>
      </Router>
    </UserProvider>
  );
}

export default App;
