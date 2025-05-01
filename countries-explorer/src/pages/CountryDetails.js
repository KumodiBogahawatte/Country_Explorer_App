import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Alert, Badge } from "react-bootstrap";
import { getCountryByCode } from "../services/api";
import { UserContext } from "../context/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

const CountryDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, addFavorite, removeFavorite, isFavorite } = useContext(UserContext);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(code);
        setCountry(data[0]);
        setError(null);
      } catch (error) {
        setError("Failed to fetch country details");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [code]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(country.cca3)) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Button onClick={handleGoBack} variant="primary">
          Back
        </Button>
      </Container>
    );
  }

  if (!country) return null;

  // Extract languages as an array
  const languages = country.languages
    ? Object.values(country.languages)
    : ["None listed"];

  return (
    <Container className="py-5">
      <Button onClick={handleGoBack} className="mb-4" variant="outline-primary">
        ← Back
      </Button>

      <Row className="mt-4">
        <Col md={6} className="mb-4">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </Col>
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-start">
            <h1>{country.name.common}</h1>
            {/* Only show favorite button if user is logged in */}
            {user && (
              <Button
                variant={isFavorite(country.cca3) ? "danger" : "outline-danger"}
                onClick={handleFavoriteToggle}
              >
                {isFavorite(country.cca3) ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            )}
          </div>
          <p>
            <strong>Official Name:</strong> {country.name.official}
          </p>
          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Subregion:</strong> {country.subregion || "N/A"}
          </p>
          <p>
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </p>
          <p>
            <strong>Languages:</strong> {languages.join(", ")}
          </p>
          
          {country.borders && country.borders.length > 0 && (
            <div>
              <strong>Border Countries:</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {country.borders.map(border => (
                  <Badge 
                    bg="light" 
                    text="dark"
                    key={border}
                    as="a" 
                    className="text-decoration-none border p-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/country/${border}`)}
                  >
                    {border}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CountryDetails;
