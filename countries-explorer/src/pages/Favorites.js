import React, { useContext } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import CountryCard from "../components/CountryCard";

const Favorites = () => {
  const { favorites } = useContext(UserContext);

  return (
    <Container className="py-5">
      <h1 className="mb-4">Your Favorite Countries</h1>
      
      {favorites.length === 0 ? (
        <Alert variant="info">
          You haven't added any countries to your favorites yet. 
          Go to the home page and add some countries!
        </Alert>
      ) : (
        <>
          <p className="mb-4">You have {favorites.length} favorite countries</p>
          
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {favorites.map((country) => (
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

export default Favorites;
