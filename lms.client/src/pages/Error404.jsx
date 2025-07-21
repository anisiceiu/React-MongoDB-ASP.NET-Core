import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaSearch, FaEnvelope } from 'react-icons/fa';
import { useEffect } from 'react';

const Error404 = () => {
    const navigate = useNavigate();

    // Optional: Auto-redirect after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 10000); // Redirect after 10 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm border-0 text-center">
                        <Card.Body className="p-5">
                            <div className="text-danger mb-4">
                                <FaExclamationTriangle size={64} />
                            </div>
                            <h1 className="display-4 fw-bold mb-3">404</h1>
                            <h2 className="mb-4">Page Not Found</h2>

                            <p className="lead text-muted mb-4">
                                Oops! The page you're looking for doesn't exist or has been moved.
                            </p>

                            <div className="d-flex justify-content-center gap-3 mb-5">
                                <Button
                                    variant="primary"
                                    as={Link}
                                    to="/"
                                    className="d-flex align-items-center gap-2"
                                >
                                    <FaHome /> Home
                                </Button>

                                <Button
                                    variant="outline-secondary"
                                    onClick={() => window.history.back()}
                                >
                                    Go Back
                                </Button>
                            </div>

                            <div className="border-top pt-4">
                                <p className="text-muted mb-3">Try one of these instead:</p>

                                <div className="d-flex flex-wrap justify-content-center gap-3">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        as={Link}
                                        to="/courses"
                                        className="d-flex align-items-center gap-1"
                                    >
                                        <FaSearch /> Browse Courses
                                    </Button>

                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        as={Link}
                                        to="/contact"
                                        className="d-flex align-items-center gap-1"
                                    >
                                        <FaEnvelope /> Contact Support
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Error404;