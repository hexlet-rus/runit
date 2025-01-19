import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

// import routes from '../../routes.js';

function AdminMenu() {
  return (
    <Nav.Item as="li">
      {/* <Button as={Link} to="/admins" variant="primary">
        Админ панель
      </Button> */}
      <Button
        as={Link}
        to="http://localhost:5001/api/admin/users"
        variant="primary"
      >
        Админ панель
      </Button>
    </Nav.Item>
  );
}

export default AdminMenu;
