import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";

describe("SearchBar Component (Unit)", () => {
  test("renders search input and button", () => {
    render(<SearchBar onSearch={() => {}} />);
    
    expect(screen.getByPlaceholderText("Search for a country...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("updates input value when typing", () => {
    render(<SearchBar onSearch={() => {}} />);
    
    const input = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(input, { target: { value: "Germany" } });
    
    expect(input.value).toBe("Germany");
  });

  test("calls onSearch prop with input value when form is submitted", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText("Search for a country...");
    const button = screen.getByRole("button", { name: /search/i });
    
    fireEvent.change(input, { target: { value: "Brazil" } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith("Brazil");
  });

  test("calls onSearch when Enter key is pressed", () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText("Search for a country...");
    const form = document.querySelector('form');
    
    fireEvent.change(input, { target: { value: "Canada" } });
    fireEvent.submit(form);
    
    expect(mockOnSearch).toHaveBeenCalledWith("Canada");
  });
});
