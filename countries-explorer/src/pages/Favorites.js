import React, { useContext } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import CountryCard from '../components/CountryCard';
import { UserContext } from '../context/UserContext';

const Favorites = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <Container className="py-5">
        <Alert variant="info">
          Please login to view your favorite countries
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Your Favorite Countries</h1>
      
      {user.favorites.length === 0 ? (
        <Alert variant="info">
          You haven't added any countries to your favorites yet. 
          Go to the home page and add some countries!
        </Alert>
      ) : (
        <>
          <p className="mb-4">
            You have {user.favorites.length} favorite countries
          </p>
          
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {user.favorites.map((country) => (
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
