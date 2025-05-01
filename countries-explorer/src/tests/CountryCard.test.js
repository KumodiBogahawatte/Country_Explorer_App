import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import CountryCard from "../components/CountryCard";

// Mock data
const mockCountry = {
  name: { common: "Germany", official: "Federal Republic of Germany" },
  flags: { png: "https://example.com/germany.png" },
  population: 83000000,
  region: "Europe",
  capital: ["Berlin"],
  cca3: "DEU"
};

// Mock context provider for testing
const renderWithContext = (ui, providerProps = {}) => {
  return render(
    <UserContext.Provider 
      value={{ 
        user: null, 
        isFavorite: () => false, 
        addFavorite: jest.fn(), 
        removeFavorite: jest.fn(),
        ...providerProps 
      }}
    >
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </UserContext.Provider>
  );
};

describe("CountryCard Component", () => {
  test("renders country information correctly", () => {
    renderWithContext(<CountryCard country={mockCountry} />);
    
    expect(screen.getByText("Germany")).toBeInTheDocument();
    expect(screen.getByText(/Population:/)).toHaveTextContent("83,000,000");
    expect(screen.getByText(/Region:/)).toHaveTextContent("Europe");
    expect(screen.getByText(/Capital:/)).toHaveTextContent("Berlin");
  });

  test("does not show favorite button when user is not logged in", () => {
    renderWithContext(<CountryCard country={mockCountry} />);
    
    const detailsButton = screen.getByText("More Details");
    expect(detailsButton).toBeInTheDocument();
    
    // Favorite button should not be present
    const favoriteButton = screen.queryByText("❤");
    expect(favoriteButton).not.toBeInTheDocument();
  });

  test("shows favorite button when user is logged in", () => {
    renderWithContext(
      <CountryCard country={mockCountry} />, 
      { user: { username: "testuser" } }
    );
    
    // Favorite button should be present for logged in users
    const favoriteButton = screen.getByText("♡");
    expect(favoriteButton).toBeInTheDocument();
  });
});