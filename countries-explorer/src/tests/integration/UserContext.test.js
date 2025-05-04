import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { UserProvider, UserContext } from "../../context/UserContext";

// Test component that consumes the context
const TestConsumer = () => {
  const { user, login, logout, addFavorite, removeFavorite, isFavorite } = React.useContext(UserContext);
  
  return (
    <div>
      <div data-testid="user-status">{user ? `Logged in as ${user.username}` : "Not logged in"}</div>
      <div data-testid="favorites-count">{user?.favorites?.length || 0}</div>
      <button onClick={() => login("testuser", "password123")}>Login</button>
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
    
    // Setup mock users for login testing
    const mockUsers = [
      { username: "testuser", password: "password123", favorites: [] }
    ];
    localStorage.setItem('users', JSON.stringify(mockUsers));
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

  test("allows logging in and adds user to localStorage", async () => {
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );
    
    // Find and click login button
    const loginButton = screen.getByText("Login");
    await act(async () => {
      loginButton.click();
      // Wait for state to update
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Check that user is now logged in
    expect(screen.getByTestId("user-status")).toHaveTextContent("Logged in as testuser");
    
    // Verify localStorage was updated
    expect(JSON.parse(localStorage.getItem("currentUser"))).toHaveProperty("username", "testuser");
  });

  test("allows logging out and removes user from localStorage", async () => {
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );
    
    // Login first
    const loginButton = screen.getByText("Login");
    await act(async () => {
      loginButton.click();
      // Wait for state to update
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Then logout
    const logoutButton = screen.getByText("Logout");
    await act(async () => {
      logoutButton.click();
      // Wait for state to update
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Check that user is now logged out
    expect(screen.getByTestId("user-status")).toHaveTextContent("Not logged in");
    
    // Verify localStorage was updated
    expect(localStorage.getItem("currentUser")).toBeNull();
  });

  test("allows adding and removing favorites", async () => {
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );
    
    // Login first
    const loginButton = screen.getByText("Login");
    await act(async () => {
      loginButton.click();
      // Wait for state to update
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Verify login was successful
    expect(screen.getByTestId("user-status")).toHaveTextContent("Logged in as testuser");
    
    // Add a favorite
    const addFavoriteButton = screen.getByText("Add Favorite");
    await act(async () => {
      addFavoriteButton.click();
      // Wait for state to update
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Check that favorite was added
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("1");
    expect(screen.getByTestId("is-favorite")).toHaveTextContent("Is favorite");
    
    // Remove the favorite
    const removeFavoriteButton = screen.getByText("Remove Favorite");
    await act(async () => {
      removeFavoriteButton.click();
      // Wait for state to update
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Check that favorite was removed
    expect(screen.getByTestId("favorites-count")).toHaveTextContent("0");
    expect(screen.getByTestId("is-favorite")).toHaveTextContent("Not favorite");
  });

  test("persists favorites in localStorage", async () => {
    render(
      <UserProvider>
        <TestConsumer />
      </UserProvider>
    );
    
    // Login first and wait for it to complete
    await act(async () => {
      screen.getByText("Login").click();
      // Wait for login to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Verify login was successful
    expect(screen.getByTestId("user-status")).toHaveTextContent("Logged in as testuser");
    
    // Then add a favorite
    await act(async () => {
      screen.getByText("Add Favorite").click();
      // Wait for state update
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Verify localStorage was updated with the favorite
    const userFavorites = JSON.parse(localStorage.getItem("userFavorites"));
    expect(userFavorites).toBeTruthy();
    expect(userFavorites.testuser).toHaveLength(1);
    expect(userFavorites.testuser[0].cca3).toBe("TST");
  });
});
