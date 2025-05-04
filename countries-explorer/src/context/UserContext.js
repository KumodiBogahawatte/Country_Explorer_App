import React, { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const useAuth = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        const storedFavorites = localStorage.getItem('favorites');

        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (storedFavorites) {
            userData.favorites = JSON.parse(storedFavorites);
          }
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const foundUser = users.find(user => user.username === username && user.password === password);
  
      if (!foundUser) throw new Error('Invalid username or password');
  
      // Get user-specific favorites from localStorage
      const allFavorites = JSON.parse(localStorage.getItem('userFavorites')) || {};
      const userFavorites = allFavorites[username] || [];
  
      const userData = {
        ...foundUser,
        favorites: userFavorites
      };
  
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // Registration function
  const register = async (username, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      if (users.some(user => user.username === username)) {
        throw new Error('Username already exists');
      }

      const newUser = {
        username,
        password,
        favorites: []
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  // Add to favorites
  const addFavorite = async (country) => {
    try {
      if (!user) throw new Error('You must be logged in to add favorites');
  
      const updatedUser = {
        ...user,
        favorites: [...(user.favorites || []), country]
      };
  
      // Store favorites per user
      const allFavorites = JSON.parse(localStorage.getItem('userFavorites')) || {};
      allFavorites[user.username] = updatedUser.favorites;
      
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      localStorage.setItem('userFavorites', JSON.stringify(allFavorites));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Remove from favorites
  const removeFavorite = async (countryCode) => {
    try {
      if (!user) throw new Error('You must be logged in to remove favorites');

      const updatedUser = {
        ...user,
        favorites: user.favorites?.filter(country => country.cca3 !== countryCode)
      };

      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      localStorage.setItem('favorites', JSON.stringify(updatedUser.favorites));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Check if country is in favorites
  const isFavorite = (countryCode) => {
    return user?.favorites?.some(country => country.cca3 === countryCode) || false;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        addFavorite,
        removeFavorite,
        isFavorite
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
