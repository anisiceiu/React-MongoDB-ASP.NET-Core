import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import MyEnrollments from '../courses/MyEnrollments';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <Layout>
        <Container className="py-5">
            <h1 className="mb-4">Dashboard</h1>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Welcome, {user?.name}</Card.Title>
                            <Card.Text>
                                You have enrolled in 5 courses and completed 2.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Your Progress</Card.Title>
                            {/* Progress charts would go here */}
                        </Card.Body>
                    </Card>
                </Col>
                </Row>
                <Row>
                    {/*<Col md={4}>*/}
                    {/*    <Card className="mb-4">*/}
                    {/*        <Card.Body>*/}
                    {/*            */}{/*<Card.Title>Welcome, {user?.name}</Card.Title>*/}
                    {/*            */}{/*<Card.Text>*/}
                    {/*            */}{/*    You have enrolled in 5 courses and completed 2.*/}
                    {/*            */}{/*</Card.Text>*/}
                    {/*        </Card.Body>*/}
                    {/*    </Card>*/}
                    {/*</Col>*/}
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>My Enrollments</Card.Title>
                                <MyEnrollments/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Dashboard;