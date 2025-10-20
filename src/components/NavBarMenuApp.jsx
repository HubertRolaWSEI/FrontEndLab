import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function NavBarMenuApp() {
  return (
    <Navbar 
      style={{ backgroundColor: '#15dc0eff' }}
      data-bs-theme="dark" 
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/home">Frontend Laby</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/lab01">Laboratorium 1</Nav.Link>
            <Nav.Link as={NavLink} to="/lab02">Laboratorium 2</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarMenuApp;


