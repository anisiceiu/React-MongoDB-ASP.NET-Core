import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="py-5 bg-light">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <h1 className="display-4">Welcome to Our LMS</h1>
                        <p className="lead">
                            Learn new skills with our comprehensive courses taught by industry experts.
                        </p>
                        <div className="mt-4">
                            <Button as={Link} to="/courses" variant="primary" size="lg" className="me-3">
                                Browse Courses
                            </Button>
                            <Button as={Link} to="/register" variant="outline-primary" size="lg">
                                Join Now
                            </Button>
                        </div>
                    </Col>
                    <Col md={6}>
                        <img
                            src="/images/course-placeholder.jpg"
                            alt="Learning"
                            className="img-fluid"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;