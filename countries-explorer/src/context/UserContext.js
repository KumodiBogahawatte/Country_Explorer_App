import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load user and favorites from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedFavorites = localStorage.getItem("favorites");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Update localStorage when favorites change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Add country to favorites
  const addFavorite = (country) => {
    setFavorites((prevFavorites) => [...prevFavorites, country]);
  };

  // Remove country from favorites
  const removeFavorite = (countryCode) => {
    setFavorites((prevFavorites) => 
      prevFavorites.filter((country) => country.cca3 !== countryCode)
    );
  };

  // Check if a country is in favorites
  const isFavorite = (countryCode) => {
    return favorites.some((country) => country.cca3 === countryCode);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
