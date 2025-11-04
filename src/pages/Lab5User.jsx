import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../data/useFetch';
import { Card, Spinner, Alert, Button, ListGroup } from 'react-bootstrap';

function Lab5User() {
  const { id } = useParams();
  
  const [userData] = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (Array.isArray(userData) && userData.length === 0) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Ładowanie użytkownika...</span>
      </Spinner>
    );
  }

  const user = userData;

  if (user && Object.keys(user).length === 0) {
       return (
         <>
            <Alert variant="danger">Błąd</Alert>
            <p>Nie znaleziono użytkownika o ID: {id}.</p>
            <Button as={Link} to="/lab5" variant="primary">Powrót do Lab 5</Button>
         </>
       );
  }

  return (
    <>
      <Button as={Link} to="/lab5" variant="outline-secondary" className="mb-3">
        &larr; Powrót do Lab 5
      </Button>
      
      <h2>Szczegóły użytkownika: {user.name}</h2>
      
      <Card>
        <Card.Header>
          <Card.Title>@{user.username}</Card.Title>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item><strong>Email:</strong> {user.email}</ListGroup.Item>
            <ListGroup.Item><strong>Phone:</strong> {user.phone}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Website:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a>
            </ListGroup.Item>
            <ListGroup.Item><strong>Company:</strong> {user.company?.name}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Address:</strong> {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default Lab5User;