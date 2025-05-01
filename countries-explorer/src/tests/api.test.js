import axios from "axios";
import { getAllCountries, getCountryByName, getCountriesByRegion, getCountryByCode } from "../services/api";

// Mock axios
jest.mock("axios");

describe("API Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllCountries fetches data successfully", async () => {
    const mockCountries = [
      { name: { common: "Germany" } },
      { name: { common: "France" } }
    ];
    
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    
    const result = await getAllCountries();
    
    expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v3.1/all");
    expect(result).toEqual(mockCountries);
  });

  test("getCountryByName fetches data for a specific country", async () => {
    const mockCountry = [{ name: { common: "Germany" } }];
    
    axios.get.mockResolvedValueOnce({ data: mockCountry });
    
    const result = await getCountryByName("germany");
    
    expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v3.1/name/germany");
    expect(result).toEqual(mockCountry);
  });

  test("getCountriesByRegion fetches countries by region", async () => {
    const mockRegionCountries = [
      { name: { common: "Germany" } },
      { name: { common: "France" } }
    ];
    
    axios.get.mockResolvedValueOnce({ data: mockRegionCountries });
    
    const result = await getCountriesByRegion("europe");
    
    expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v3.1/region/europe");
    expect(result).toEqual(mockRegionCountries);
  });

  test("getCountryByCode fetches a country by its code", async () => {
    const mockCountry = [{ name: { common: "Germany" }, cca3: "DEU" }];
    
    axios.get.mockResolvedValueOnce({ data: mockCountry });
    
    const result = await getCountryByCode("DEU");
    
    expect(axios.get).toHaveBeenCalledWith("https://restcountries.com/v3.1/alpha/DEU");
    expect(result).toEqual(mockCountry);
  });

  test("handles API errors correctly", async () => {
    axios.get.mockRejectedValueOnce(new Error("API Error"));
    
    await expect(getAllCountries()).rejects.toThrow("API Error");
  });
});
