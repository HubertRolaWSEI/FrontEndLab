import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../data/useFetch';
import { Card, Spinner, Alert, Button, ListGroup } from 'react-bootstrap';

function Lab5PostComments() {
  const { id } = useParams();

  const [postData] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const [commentsData] = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);


  if (
    (Array.isArray(postData) && postData.length === 0) ||
    (Array.isArray(commentsData) && commentsData.length === 0 && !postData.id) 
  ) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Ładowanie posta i komentarzy...</span>
      </Spinner>
    );
  }

  const post = postData;
  
  if (post && Object.keys(post).length === 0) {
       return (
         <>
            <Alert variant="danger">Błąd</Alert>
            <p>Nie znaleziono posta o ID: {id}.</p>
            <Button as={Link} to="/lab5" variant="primary">Powrót do Lab 5</Button>
         </>
       );
  }

  return (
    <>
      <Button as={Link} to="/lab5" variant="outline-secondary" className="mb-3">
        &larr; Powrót do Lab 5
      </Button>

      <Card className="mb-4">
        <Card.Header>Post #{post.id}</Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
      </Card>
      
      <h4>Komentarze ({commentsData.length}):</h4>

      <ListGroup>
        {commentsData.length > 0 ? (
          commentsData.map(comment => (
            <ListGroup.Item key={comment.id} as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{comment.name}</div>
                {comment.body}
              </div>
              <span className="text-muted ms-3">
                <small>Autor: {comment.email}</small>
              </span>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Brak komentarzy dla tego posta.</ListGroup.Item>
        )}
      </ListGroup>
    </>
  );
}

export default Lab5PostComments;