import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData'));

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <Navbar bg="warning-subtle" expand="lg" className="border-bottom border-warning shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold">SIMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            {user?.role === 'admin' && <Nav.Link as={Link} to="/admin">Admin Panel</Nav.Link>}
          </Nav>
          {user ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="d-flex align-items-center text-decoration-none">
                <div className="rounded-circle me-2 bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                  {user?.username?.charAt(0).toUpperCase() || '?'}
                </div>
                <span>{user.full_name || user.username}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login" className="btn btn-outline-primary">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;