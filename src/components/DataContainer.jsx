import React from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useData from '../data/useData';    
import useDispatch from '../data/useDispatch'; 

function DataContainer({ element: ElementComponent, columns = 3 }) {
  const items = useData();
  const dispatch = useDispatch();
  if (!ElementComponent || !items) {
    return <p>Brak komponentu 'element' lub danych 'items' w kontekście.</p>;
  }
  const columnClass = `row row-cols-1 row-cols-sm-2 row-cols-md-${columns} g-4`;
  return (
    <Container className="my-4">
      <Row className={columnClass}>
        {items.map((item) => (
          <Col key={item.id}>
            <ElementComponent {...item} dispatch={dispatch} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default DataContainer;