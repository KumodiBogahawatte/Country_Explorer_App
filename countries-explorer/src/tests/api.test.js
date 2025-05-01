import axios from "axios";
import { getAllCountries, getCountryByName, getCountriesByRegion, getCountryByCode } from "../services/api";

// Mock axios
jest.mock("axios");

describe("API Services", () => {
  beforeEach(() => {
    // Clears any mocked method calls before each test
    jest.clearAllMocks();
    // If you were spying on console.error, you'd restore it here
    // jest.restoreAllMocks();
  });

  test("getAllCountries fetches data successfully", async () => {
    const mockCountries = [
      { name: { common: "Germany" } },
      { name: { common: "France" } }
    ];

    // Mock axios.get to return the desired data for this specific call
    axios.get.mockResolvedValueOnce({ data: mockCountries });

    const result = await getAllCountries();

    // Expect axios.get to have been called with the correct URL
    expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v3.1/all");
    // Expect the function to return the mocked data
    expect(result).toEqual(mockCountries);
  });

  test("getCountryByName fetches data for a specific country", async () => {
    const mockCountry = [{ name: { common: "Germany" } }];
    const countryName = "germany";

    axios.get.mockResolvedValueOnce({ data: mockCountry });

    const result = await getCountryByName(countryName);

    expect(axios.get).toHaveBeenCalledWith(`https://restcountries.com/v3.1/name/${countryName}`);
    expect(result).toEqual(mockCountry);
  });

  test("getCountriesByRegion fetches countries by region", async () => {
    const mockRegionCountries = [
      { name: { common: "Germany", official: "Federal Republic of Germany" } },
      { name: { common: "France", official: "French Republic" } }
    ];
    const region = "europe";

    axios.get.mockResolvedValueOnce({ data: mockRegionCountries });

    const result = await getCountriesByRegion(region);

    expect(axios.get).toHaveBeenCalledWith(`https://restcountries.com/v3.1/region/${region}`);
    expect(result).toEqual(mockRegionCountries);
  });

  test("getCountryByCode fetches a country by its code", async () => {
    const mockCountry = [{ name: { common: "Germany" }, cca3: "DEU" }];
    const countryCode = "DEU";

    axios.get.mockResolvedValueOnce({ data: mockCountry });

    const result = await getCountryByCode(countryCode);

    expect(axios.get).toHaveBeenCalledWith(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    expect(result).toEqual(mockCountry);
  });

  test("handles API errors correctly", async () => {
    const errorMessage = "Request failed with status code 404";
    const error = new Error(errorMessage);
    // Mock axios.get to reject with an error
    axios.get.mockRejectedValueOnce(error);

    // Use a spy to check if console.error is called in the catch block
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Expect the promise returned by getAllCountries to reject with the original error
    await expect(getAllCountries()).rejects.toThrow(errorMessage);

    // Expect console.error to have been called with the error
    expect(consoleSpy).toHaveBeenCalledWith('Error fetching all countries:', error);

    // Restore the original console.error implementation
    consoleSpy.mockRestore();
  });
});
