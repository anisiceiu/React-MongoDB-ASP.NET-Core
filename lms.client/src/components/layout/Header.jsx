import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} to="/">LMS</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                        {isAuthenticated && user?.role === 'student' && (
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        )}
                        {isAuthenticated && user?.role === 'admin' && (
                            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                        )}
                        {isAuthenticated && user?.role === 'instructor' && (
                            <Nav.Link as={Link} to="/instructor">Instructor</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        {!isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        ) : (
                            <NavDropdown title={user?.name} id="username">
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;