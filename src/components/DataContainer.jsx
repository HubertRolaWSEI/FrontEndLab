import React, { useReducer } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppReducer from '../data/AppReducer'; 

const init = (initialData) => {
  return initialData.map(person => ({
    ...person,
    rating: person.rating || 0,   
    check: person.check || false 
  }));
};

function DataContainer({ element: ElementComponent, data, columns = 3 }) {

  const [state, dispatch] = useReducer(AppReducer, data, init);

  if (!ElementComponent || !state) {
    return <p>Brak komponentu 'element' lub danych 'data'.</p>;
  }

  const columnClass = `row row-cols-1 row-cols-sm-2 row-cols-md-${columns} g-4`;

  return (
    <Container className="my-4">
      <Row className={columnClass}>
        {state.map((item) => (
          <Col key={item.id}>
            <ElementComponent {...item} dispatch={dispatch} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default DataContainer;