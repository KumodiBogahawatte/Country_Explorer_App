import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
// Import MemoryRouter for testing components that use React Router components like Link
import { MemoryRouter } from "react-router-dom";
// We need the actual UserContext definition to mock it properly
import { UserContext } from "../context/UserContext";
import CountryCard from "../components/CountryCard";

// Mock data
const mockCountry = {
  name: { common: "Germany", official: "Federal Republic of Germany" },
  flags: { png: "https://example.com/germany.png" },
  population: 83000000,
  region: "Europe",
  capital: ["Berlin"],
  cca3: "DEU" // Important for linking and favoriting
};

// Mock context provider for testing
// This helper now includes MemoryRouter wrapping
const renderWithContextAndRouter = (ui, providerProps = {}) => {
  return render(
    <UserContext.Provider
      value={{
        user: null, // Default user state for tests
        isFavorite: jest.fn(() => false), // Default favorite state for tests
        addFavorite: jest.fn(), // Mock addFavorite function
        removeFavorite: jest.fn(), // Mock removeFavorite function
        // Spread any additional or overridden props provided to the helper
        ...providerProps
      }}
    >
      {/* Wrap the component in MemoryRouter to provide routing context for Link */}
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </UserContext.Provider>
  );
};

describe("CountryCard Component", () => {
  // Clear all mock function calls before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders country information correctly", () => {
    renderWithContextAndRouter(<CountryCard country={mockCountry} />);

    expect(screen.getByText(mockCountry.name.common)).toBeInTheDocument();
    // Use regex to match partial text like "Population: 83,000,000"
    expect(screen.getByText(/Population:/)).toHaveTextContent("83,000,000");
    expect(screen.getByText(/Region:/)).toHaveTextContent(mockCountry.region);
    expect(screen.getByText(/Capital:/)).toHaveTextContent(mockCountry.capital[0]);

    // Check the flag image is present with correct alt text and src
    const flagImage = screen.getByAltText(`Flag of ${mockCountry.name.common}`);
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', mockCountry.flags.png);

    // Check the "More Details" link button is present and has the correct href
    const detailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/country/${mockCountry.cca3}`);
  });

  test("does not show favorite button when user is not logged in", () => {
    // Render with default context (user: null)
    renderWithContextAndRouter(<CountryCard country={mockCountry} />);

    // Favorite button should not be present
    // Check by accessible label or text content
    const favoriteButton = screen.queryByRole('button', { name: /favorites/i });
    const favoriteHeart = screen.queryByText(/❤|♡/); // Check for either heart symbol

    expect(favoriteButton).not.toBeInTheDocument();
    expect(favoriteHeart).not.toBeInTheDocument();

    // Ensure the "More Details" button is still visible
    expect(screen.getByText("More Details")).toBeInTheDocument();
  });

  test("shows outline favorite button when user is logged in and country is NOT favorited", () => {
    // Provide a mock context value where user is logged in and isFavorite returns false
    const mockContextValue = {
      user: { username: "testuser" }, // Simulate logged-in user
      isFavorite: jest.fn(() => false), // Mock isFavorite to return false
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    };

    renderWithContextAndRouter(
      <CountryCard country={mockCountry} />,
      mockContextValue // Pass the mock context value
    );

    // Expect isFavorite to have been called with the country's code
    expect(mockContextValue.isFavorite).toHaveBeenCalledWith(mockCountry.cca3);

    // The favorite button should be present
    const favoriteButton = screen.getByRole('button', { name: /Add to favorites/i });
    expect(favoriteButton).toBeInTheDocument();

    // It should show the outline heart icon
    expect(favoriteButton).toHaveTextContent("♡");
    expect(favoriteButton).not.toHaveTextContent("❤");

    // Optionally check Bootstrap variant class
    expect(favoriteButton).toHaveClass('btn-outline-danger');
  });

  test("shows filled favorite button when user is logged in and country IS favorited", () => {
    // Provide a mock context value where user is logged in and isFavorite returns true
    const mockContextValue = {
      user: { username: "testuser" }, // Simulate logged-in user
      isFavorite: jest.fn(() => true), // Mock isFavorite to return true
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    };

    renderWithContextAndRouter(
      <CountryCard country={mockCountry} />,
      mockContextValue // Pass the mock context value
    );

    // Expect isFavorite to have been called
    expect(mockContextValue.isFavorite).toHaveBeenCalledWith(mockCountry.cca3);

    // The favorite button should be present
    const favoriteButton = screen.getByRole('button', { name: /Remove from favorites/i });
    expect(favoriteButton).toBeInTheDocument();

    // It should show the filled heart icon
    expect(favoriteButton).toHaveTextContent("❤");
    expect(favoriteButton).not.toHaveTextContent("♡");

    // Optionally check Bootstrap variant class
    expect(favoriteButton).toHaveClass('btn-danger');
  });

  test("calls addFavorite when the add favorite button (outline heart) is clicked", () => {
    // Set up mock context for a logged-in user with the country NOT favorited
    const mockContextValue = {
      user: { username: "testuser" },
      isFavorite: jest.fn(() => false),
      addFavorite: jest.fn(), // We want to test if this is called
      removeFavorite: jest.fn(), // Ensure this is NOT called
    };

    renderWithContextAndRouter(
      <CountryCard country={mockCountry} />,
      mockContextValue
    );

    // Find the button that adds to favorites
    const favoriteButton = screen.getByRole('button', { name: /Add to favorites/i });

    // Simulate a click event on the button
    fireEvent.click(favoriteButton);

    // Expect the addFavorite mock function to have been called exactly once
    expect(mockContextValue.addFavorite).toHaveBeenCalledTimes(1);
    // Expect addFavorite to have been called with the correct country object
    expect(mockContextValue.addFavorite).toHaveBeenCalledWith(mockCountry);

    // Ensure removeFavorite was not called during this action
    expect(mockContextValue.removeFavorite).not.toHaveBeenCalled();
  });

  test("calls removeFavorite when the remove favorite button (filled heart) is clicked", () => {
    // Set up mock context for a logged-in user with the country IS favorited
    const mockContextValue = {
      user: { username: "testuser" },
      isFavorite: jest.fn(() => true), // Indicate country is a favorite
      addFavorite: jest.fn(), // Ensure this is NOT called
      removeFavorite: jest.fn(), // We want to test if this is called
    };

    renderWithContextAndRouter(
      <CountryCard country={mockCountry} />,
      mockContextValue
    );

    // Find the button that removes from favorites
    const favoriteButton = screen.getByRole('button', { name: /Remove from favorites/i });

    // Simulate a click event on the button
    fireEvent.click(favoriteButton);

    // Expect the removeFavorite mock function to have been called exactly once
    expect(mockContextValue.removeFavorite).toHaveBeenCalledTimes(1);
    // Expect removeFavorite to have been called with the correct country code (cca3)
    expect(mockContextValue.removeFavorite).toHaveBeenCalledWith(mockCountry.cca3);

    // Ensure addFavorite was not called during this action
    expect(mockContextValue.addFavorite).not.toHaveBeenCalled();
  });
});
