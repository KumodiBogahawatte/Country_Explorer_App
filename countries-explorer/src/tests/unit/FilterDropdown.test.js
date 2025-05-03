import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterDropdown from "../../components/FilterDropdown";

describe("FilterDropdown Component (Unit)", () => {
  test("renders filter dropdown with default option", () => {
    render(<FilterDropdown onFilter={() => {}} />);
    
    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByText("Filter by Region")).toBeInTheDocument();
  });

  test("renders all region options", () => {
    render(<FilterDropdown onFilter={() => {}} />);
    
    expect(screen.getByText("Africa")).toBeInTheDocument();
    expect(screen.getByText("Americas")).toBeInTheDocument();
    expect(screen.getByText("Asia")).toBeInTheDocument();
    expect(screen.getByText("Europe")).toBeInTheDocument();
    expect(screen.getByText("Oceania")).toBeInTheDocument();
  });

  test("calls onFilter when a region is selected", () => {
    const mockOnFilter = jest.fn();
    render(<FilterDropdown onFilter={mockOnFilter} />);
    
    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, { target: { value: "Europe" } });
    
    expect(mockOnFilter).toHaveBeenCalledWith("Europe");
  });
});
