import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert,
    Spinner
} from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const InstructorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/instructor';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login({ email, password, role: 'instructor' });
            toast.success('Logged in successfully as instructor!');
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed');
            toast.error('Failed to login as instructor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <h2>Instructor Login</h2>
                                <p className="text-muted">Access your instructor dashboard</p>
                            </div>

                            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>
                                {error}
                            </Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="instructor@example.com"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Enter your password"
                                    />
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-100 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span className="ms-2">Logging in...</span>
                                        </>
                                    ) : (
                                        'Login as Instructor'
                                    )}
                                </Button>
                            </Form>

                            <div className="text-center mt-3">
                                <Link to="/forgot-password">Forgot Password?</Link>
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="text-center mt-3">
                        <p className="text-muted">
                            Not an instructor? <Link to="/login">Student Login</Link>
                        </p>
                        <p>
                            Need an instructor account? <Link to="/register/instructor">Apply now</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default InstructorLogin;