import { useState } from 'react';
import { Form, Button, Container, Card, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: 'student' // default role
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (formData.password !== formData.passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <h2>Create Your Account</h2>
                                <p className="text-muted">Join our learning community today</p>
                            </div>

                            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email"
                                    />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                minLength="6"
                                                placeholder="Create password"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="passwordConfirm"
                                                value={formData.passwordConfirm}
                                                onChange={handleChange}
                                                required
                                                placeholder="Confirm password"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Label>Register As</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Student"
                                            name="role"
                                            value="student"
                                            checked={formData.role === 'student'}
                                            onChange={handleChange}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Instructor"
                                            name="role"
                                            value="instructor"
                                            checked={formData.role === 'instructor'}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Form.Group>

                                <Button type="submit" variant="primary" size="lg" className="w-100 mb-3">
                                    Register
                                </Button>

                                <div className="text-center mt-3">
                                    <p className="text-muted">
                                        Already have an account? <Link to="/login">Login here</Link>
                                    </p>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;