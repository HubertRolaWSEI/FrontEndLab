import Container from 'react-bootstrap/Container';
import NavBarMenuApp from '../components/NavBarMenuApp';
import FooterApp from '../components/FooterApp';
import { Outlet } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <NavBarMenuApp/>
      <Container className="my-4">
        <Outlet/>
      </Container>
      <FooterApp/>
    </>
  );
}

export default RootLayout;


