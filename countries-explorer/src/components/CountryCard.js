import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const CountryCard = ({ country }) => {
  const { user, addFavorite, removeFavorite, isFavorite } = useContext(UserContext);
  // Only check for favorites if user is logged in
  const isCountryInFavorites = user && isFavorite(country.cca3);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCountryInFavorites) {
      removeFavorite(country.cca3);
    } else {
      addFavorite(country);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ height: "160px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{country.name.common}</Card.Title>
        <Card.Text>
          <strong>Population:</strong>{" "}
          {country.population.toLocaleString()}
          <br />
          <strong>Region:</strong> {country.region}
          <br />
          <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
        </Card.Text>
        <div className="d-flex mt-auto">
          <Button
            as={Link}
            to={`/country/${country.cca3}`}
            variant="primary"
            className="flex-grow-1"
          >
            More Details
          </Button>
          
          {/* Only show favorite button if user is logged in */}
          {user && (
            <Button
              variant={isCountryInFavorites ? "danger" : "outline-danger"}
              className="ms-2"
              onClick={handleFavoriteToggle}
              aria-label={isCountryInFavorites ? "Remove from favorites" : "Add to favorites"}
            >
              {isCountryInFavorites ? "❤" : "♡"}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default CountryCard;
