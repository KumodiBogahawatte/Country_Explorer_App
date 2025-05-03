import React from "react";
import { render, screen, act } from "@testing-library/react";
import { UserProvider, UserContext } from "../../context/UserContext";

// Test component that consumes the context
const TestConsumer = () => {
  const { user, login, logout, favorites, addFavorite, removeFavorite, isFavorite } = React.useContext(UserContext);
  
  return (
    <div>
      <div data-testid="user-status">{user ? `Logged in as ${user.username}` : "Not logged in"}</div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <button onClick={() => login({ username: "testuser" })}>Login</button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => addFavorite({ name: { common: "Test Country" }, cca3: "TST" })}>Add Favorite</button>
      <button onClick={() => removeFavorite("TST")}>Remove Favorite</button>
      <div data-testid="is-favorite">{isFavorite("TST") ? "Is favorite" : "Not favorite"}</div>
    </div>
  );
};

describe("UserContext (Integration)", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test("provides default context values", () => {
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );
    
    expect(screen.getByTestId("user-status")).toHaveTextContent("Not logged in");
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-favorite")).toHaveTextContent("Not favorite");
  });

  test("allows logging in and adds user to localStorage", () => {
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );
    
    // Find and click login button
    const loginButton = screen.getByText("Login");
    act(() => {
      loginButton.click();
    });
    
    // Check that user is now logged in
    expect(screen.getByTestId("user-status")).toHaveTextContent("Logged in as testuser");
    
    // Verify localStorage was updated
    expect(JSON.parse(localStorage.getItem("user"))).toEqual({ username: "testuser" });
  });

  test("allows logging out and removes user from localStorage", () => {
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );
    
    // Login first
    const loginButton = screen.getByText("Login");
    act(() => {
      loginButton.click();
    });
    
    // Then logout
    const logoutButton = screen.getByText("Logout");
    act(() => {
      logoutButton.click();
    });
    
    // Check that user is now logged out
    expect(screen.getByTestId("user-status")).toHaveTextContent("Not logged in");
    
    // Verify localStorage was updated
    expect(localStorage.getItem("user")).toBeNull();
  });

  test("allows adding and removing favorites", () => {
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );
    
    // Login first
    const loginButton = screen.getByText("Login");
    act(() => {
      loginButton.click();
    });
    
    // Add a favorite
    const addFavoriteButton = screen.getByText("Add Favorite");
    act(() => {
      addFavoriteButton.click();
    });
    
    // Check that favorite was added
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
    expect(screen.getByTestId("is-favorite")).toHaveTextContent("Is favorite");
    
    // Remove the favorite
    const removeFavoriteButton = screen.getByText("Remove Favorite");
    act(() => {
      removeFavoriteButton.click();
    });
    
    // Check that favorite was removed
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-favorite")).toHaveTextContent("Not favorite");
  });

  test("persists favorites in localStorage", () => {
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );
    
    // Login and add a favorite
    act(() => {
      screen.getByText("Login").click();
      screen.getByText("Add Favorite").click();
    });
    
    // Verify localStorage was updated with the favorite
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    expect(storedFavorites).toHaveLength(1);
    expect(storedFavorites[0].cca3).toBe("TST");
  });
});
