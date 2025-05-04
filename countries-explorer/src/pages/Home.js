import { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import FilterDropdown from "../components/FilterDropdown";
import CountryCard from "../components/CountryCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { getAllCountries, getCountryByName, getCountriesByRegion } from "../services/api";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchInitialCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialCountries();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setSelectedRegion('');

    if (!query.trim()) {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const data = await getCountryByName(query);
      setCountries(data);
      setError(null);
    } catch (error) {
      setError(`No countries found matching "${query}"`);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (region) => {
    setSelectedRegion(region);
    setSearchQuery('');

    if (!region) {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const data = await getCountriesByRegion(region);
      setCountries(data);
      setError(null);
    } catch (error) {
      setError(`Failed to fetch countries in ${region}`);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Explore Countries of the World</h1>
      
      <Row className="mb-4">
        <Col md={6} className="mb-3 mb-md-0">
          <SearchBar onSearch={handleSearch} />
        </Col>
        <Col md={6}>
          <FilterDropdown onFilter={handleFilter} />
        </Col>
      </Row>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <p className="mb-4">
            Found {countries.length} {countries.length === 1 ? 'country' : 'countries'}
            {searchQuery && ` matching "${searchQuery}"`}
            {selectedRegion && ` in ${selectedRegion}`}
          </p>
          
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {countries.map((country) => (
              <Col key={country.cca3}>
                <CountryCard country={country} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};

export default Home;
