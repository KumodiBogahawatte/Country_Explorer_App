import axios from "axios";
import { 
  getAllCountries, 
  getCountryByName, 
  getCountriesByRegion, 
  getCountryByCode 
} from "../../services/api";

// Mock axios
jest.mock("axios");

describe("API Services (Integration)", () => {
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
    const countryName = "germany";

    axios.get.mockResolvedValueOnce({ data: mockCountry });

    const result = await getCountryByName(countryName);

    expect(axios.get).toHaveBeenCalledWith(`https://restcountries.com/v3.1/name/${countryName}`);
    expect(result).toEqual(mockCountry);
  });

  test("getCountriesByRegion fetches countries by region", async () => {
    const mockRegionCountries = [
      { name: { common: "Germany" } },
      { name: { common: "France" } }
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

  test("handles API errors properly", async () => {
    const errorMessage = "Request failed with status code 404";
    const error = new Error(errorMessage);
    axios.get.mockRejectedValueOnce(error);

    // Spy on console.error to verify it's called
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(getAllCountries()).rejects.toThrow(errorMessage);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error fetching all countries'), error);

    consoleSpy.mockRestore();
  });
});
