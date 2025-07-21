import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
/*import logo from '../../assets/logo.svg'; // Replace with your logo*/

const PublicNavbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm" >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    {/*<img*/}
                    {/*    src={logo}*/}
                    {/*    width="120"*/}
                    {/*    height="30"*/}
                    {/*    className="d-inline-block align-top"*/}
                    {/*    alt="LMS Logo"*/}
                    {/*/>*/}
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                        {isAuthenticated && user?.role === 'student' && (
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        )}
                        {isAuthenticated && user?.role === 'instructor' && (
                            <Nav.Link as={Link} to="/instructor">Instructor</Nav.Link>
                        )}
                        {isAuthenticated && user?.role === 'admin' && (
                            <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                        )}
                    </Nav>

                    <Nav>
                        {!isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/instructor-login">
                                    <Button variant="outline-primary" size="sm" className="me-2">
                                        Instructor Login
                                    </Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login">
                                    <Button variant="outline-primary" size="sm" className="me-2">
                                        Login
                                    </Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    <Button variant="primary" size="sm">
                                        Register
                                    </Button>
                                </Nav.Link>
                            </>
                        ) : (
                            <NavDropdown
                                title={
                                    <div className="d-inline-flex align-items-center">
                                        <img
                                            src={user?.avatar || '/images/avatar-placeholder.png'}
                                            alt={user?.name}
                                            className="rounded-circle me-2"
                                            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                        />
                                        {user?.name}
                                    </div>
                                }
                                align="end"
                            >
                                <NavDropdown.Item as={Link} to={
                                    user?.role === 'student' ? '/dashboard' :
                                        user?.role === 'instructor' ? '/instructor' : '/admin'
                                }>
                                    My Dashboard
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/profile">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default PublicNavbar;