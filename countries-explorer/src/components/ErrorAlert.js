import React from "react";
import { Alert } from "react-bootstrap";

const ErrorAlert = ({ message }) => {
  return (
    <Alert variant="danger" className="my-3">
      <Alert.Heading>Error</Alert.Heading>
      <p>{message || "An unexpected error occurred. Please try again later."}</p>
    </Alert>
  );
};

export default ErrorAlert;
