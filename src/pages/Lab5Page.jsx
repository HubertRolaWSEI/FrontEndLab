import React, { useEffect, useReducer } from 'react';
import { Table, Accordion, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useFetch from '../data/useFetch';
import TableDataReducer from '../data/TableDataReducer';
import TableHeader from '../components/TableHeader';

const initialState = {
  originalData: [],
  displayData: [] 
};

function Lab5Page() {
  const [posts] = useFetch("https://jsonplaceholder.typicode.com/posts");
  const [users] = useFetch("https://jsonplaceholder.typicode.com/users");
  const [comments] = useFetch("https://jsonplaceholder.typicode.com/comments");

  const [state, dispatch] = useReducer(TableDataReducer, initialState);

  useEffect(() => {
    if (posts.length > 0 && users.length > 0 && comments.length > 0) {
      
      const combinedData = posts.map((p) => {
        return {
          user: users.find((u) => u.id === p.userId),
          post: p,
          comments: comments.filter((c) => c.postId === p.id),
        };
      });
      
      dispatch({ type: 'SET_DATA', payload: combinedData });
    }
  }, [posts, users, comments]); 

  if (state.displayData.length === 0) {
    return (
      <>
        <h2>Laboratorium 5 - Dane z API</h2>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Ładowanie danych...</span>
        </Spinner>
        <p>Pobieranie postów, użytkowników i komentarzy...</p>
      </>
    );
  }

  return (
    <>
      <h2>Laboratorium 5</h2>
      <Alert variant="info">
        Znaleziono {state.displayData.length} postów. Kliknij nagłówki tabeli, aby sortować.
      </Alert>

      <Table striped bordered hover responsive>
        <thead>
          <tr style={{ backgroundColor: '#ffffffff' }}>
            <TableHeader title="User" sortKey="user" dispatch={dispatch} />
            <TableHeader title="Post Title" sortKey="post" dispatch={dispatch} />
            <TableHeader title="Comments Count" sortKey="comments" dispatch={dispatch} />
          </tr>
        </thead>
        <tbody>
          {state.displayData.map(({ user, post, comments }) => (
            <tr key={post.id}>
              
              <td>
                {user ? (
                  <Link to={`/lab5/users/${user.id}`}>{user.name}</Link>
                ) : (
                  'Nieznany'
                )}
              </td>
              
              <td>
                <Accordion>
                  <Accordion.Item eventKey={post.id.toString()}>
                    <Accordion.Header>{post.title}</Accordion.Header>
                    <Accordion.Body>
                      {post.body}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </td>
              
              <td className="text-center">
                <Link to={`/lab5/posts/${post.id}/comments`}>
                  {comments.length}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Lab5Page;