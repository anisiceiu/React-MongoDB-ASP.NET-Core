import { useState, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Badge,
    Button,
    ProgressBar,
    Spinner,
    Alert,
    Tab,
    Tabs
} from 'react-bootstrap';
import {
    FiBook,
    FiUsers,
    FiDollarSign,
    FiBarChart2,
    FiCalendar,
    FiMessageSquare,
    FiStar
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { fetchInstructorCourses, fetchInstructorStats } from '../../api/courses';
import Layout from '../../components/layout/Layout';
//import { Line, Bar } from 'react-chartjs-2';
//import {
//    Chart as ChartJS,
//    CategoryScale,
//    LinearScale,
//    PointElement,
//    LineElement,
//    BarElement,
//    Title,
//    Tooltip,
//    Legend
//} from 'chart.js';

// Register ChartJS components
//ChartJS.register(
//    CategoryScale,
//    LinearScale,
//    PointElement,
//    LineElement,
//    BarElement,
//    Title,
//    Tooltip,
//    Legend
//);

const InstructorDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState(null);
    const [courses, setCourses] = useState([]);
    const [activeTab, setActiveTab] = useState('courses');

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                //const [statsData,coursesData] = await Promise.all([
                //    fetchInstructorStats(),
                //    fetchInstructorCourses(user.id)
                //]);
                //setStats(statsData);
                const coursesData = await fetchInstructorCourses(user.id);
                setCourses(coursesData);
            } catch (err) {
                setError(err.message || 'Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    //const enrollmentChartData = {
    //    labels: stats?.enrollmentTrend?.labels || [],
    //    datasets: [
    //        {
    //            label: 'Enrollments',
    //            data: stats?.enrollmentTrend?.data || [],
    //            backgroundColor: 'rgba(54, 162, 235, 0.5)',
    //            borderColor: 'rgba(54, 162, 235, 1)',
    //            borderWidth: 1
    //        }
    //    ]
    //};

    //const revenueChartData = {
    //    labels: stats?.revenueTrend?.labels || [],
    //    datasets: [
    //        {
    //            label: 'Revenue',
    //            data: stats?.revenueTrend?.data || [],
    //            borderColor: 'rgba(75, 192, 192, 1)',
    //            backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //            tension: 0.1,
    //            fill: true
    //        }
    //    ]
    //};

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Layout>
            <Container className="py-5">
                <Alert variant="danger">{error}</Alert>
                <Button
                    variant="primary"
                    as={Link}
                    to="/instructor/courses/create"
                >
                    Create New Course
                </Button>
            </Container>
            </Layout >
        );
    }

    return (
        <Layout>
        <Container fluid className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Instructor Dashboard</h1>
                <Button
                    variant="primary"
                    as={Link}
                    to="/instructor/courses/create"
                >
                    Create New Course
                </Button>
            </div>

            {/* Stats Cards */}
            {/*<Row className="mb-4">*/}
            {/*    <Col xl={3} lg={6} md={6} className="mb-4">*/}
            {/*        <Card className="h-100 shadow-sm">*/}
            {/*            <Card.Body>*/}
            {/*                <Row className="align-items-center">*/}
            {/*                    <Col xs={8}>*/}
            {/*                        <h6 className="text-uppercase text-muted mb-0">Total Courses</h6>*/}
            {/*                        <h3 className="mb-0">{stats?.totalCourses || 0}</h3>*/}
            {/*                        <small className="text-muted">*/}
            {/*                            {stats?.activeCourses || 0} published*/}
            {/*                        </small>*/}
            {/*                    </Col>*/}
            {/*                    <Col xs={4} className="text-end">*/}
            {/*                        <div className="icon-shape bg-primary text-white rounded-circle p-3">*/}
            {/*                            <FiBook size={24} />*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}

            {/*    <Col xl={3} lg={6} md={6} className="mb-4">*/}
            {/*        <Card className="h-100 shadow-sm">*/}
            {/*            <Card.Body>*/}
            {/*                <Row className="align-items-center">*/}
            {/*                    <Col xs={8}>*/}
            {/*                        <h6 className="text-uppercase text-muted mb-0">Total Students</h6>*/}
            {/*                        <h3 className="mb-0">{stats?.totalStudents || 0}</h3>*/}
            {/*                        <small className="text-muted">*/}
            {/*                            <Badge bg={stats?.studentGrowth >= 0 ? 'success' : 'danger'}>*/}
            {/*                                {stats?.studentGrowth >= 0 ? '+' : ''}{stats?.studentGrowth || 0}% this month*/}
            {/*                            </Badge>*/}
            {/*                        </small>*/}
            {/*                    </Col>*/}
            {/*                    <Col xs={4} className="text-end">*/}
            {/*                        <div className="icon-shape bg-info text-white rounded-circle p-3">*/}
            {/*                            <FiUsers size={24} />*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}

            {/*    <Col xl={3} lg={6} md={6} className="mb-4">*/}
            {/*        <Card className="h-100 shadow-sm">*/}
            {/*            <Card.Body>*/}
            {/*                <Row className="align-items-center">*/}
            {/*                    <Col xs={8}>*/}
            {/*                        <h6 className="text-uppercase text-muted mb-0">Total Revenue</h6>*/}
            {/*                        <h3 className="mb-0">${stats?.totalRevenue?.toLocaleString() || 0}</h3>*/}
            {/*                        <small className="text-muted">*/}
            {/*                            ${stats?.monthlyRevenue?.toLocaleString() || 0} this month*/}
            {/*                        </small>*/}
            {/*                    </Col>*/}
            {/*                    <Col xs={4} className="text-end">*/}
            {/*                        <div className="icon-shape bg-success text-white rounded-circle p-3">*/}
            {/*                            <FiDollarSign size={24} />*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}

            {/*    <Col xl={3} lg={6} md={6} className="mb-4">*/}
            {/*        <Card className="h-100 shadow-sm">*/}
            {/*            <Card.Body>*/}
            {/*                <Row className="align-items-center">*/}
            {/*                    <Col xs={8}>*/}
            {/*                        <h6 className="text-uppercase text-muted mb-0">Avg. Rating</h6>*/}
            {/*                        <h3 className="mb-0">{stats?.averageRating?.toFixed(1) || 0}</h3>*/}
            {/*                        <ProgressBar*/}
            {/*                            now={(stats?.averageRating / 5) * 100 || 0}*/}
            {/*                            variant="warning"*/}
            {/*                            className="mt-2"*/}
            {/*                        />*/}
            {/*                    </Col>*/}
            {/*                    <Col xs={4} className="text-end">*/}
            {/*                        <div className="icon-shape bg-warning text-white rounded-circle p-3">*/}
            {/*                            <FiStar size={24} />*/}
            {/*                        </div>*/}
            {/*                    </Col>*/}
            {/*                </Row>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}

            {/* Charts and Content */}
            <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
            >
                {/*<Tab eventKey="overview" title="Overview">*/}
                {/*    <Row className="mb-4">*/}
                {/*        <Col lg={6} className="mb-4">*/}
                {/*            <Card className="h-100 shadow-sm">*/}
                {/*                <Card.Body>*/}
                {/*                    <Card.Title>Enrollment</Card.Title>*/}
                {/*                        {selectedCourse && (*/}
                {/*                            <div className="mt-4">*/}
                {/*                                <h4>Enrollments for {selectedCourse.title}</h4>*/}
                {/*                                <EnrollmentList courseId={selectedCourse.id} />*/}
                {/*                            </div>*/}
                {/*                        )}*/}
                {/*                </Card.Body>*/}
                {/*            </Card>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Tab>*/}
                <Tab eventKey="courses" title="My Courses">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th>Status</th>
                                        <th>Students</th>
                                        <th>Rating</th>
                                        <th>Revenue</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course._id}>
                                            <td>
                                                <Link to={`/instructor/courses/edit/${course.id}`}>
                                                    {course.title}
                                                </Link>
                                            </td>
                                            <td>
                                                <Badge bg={course.published ? 'success' : 'warning'}>
                                                    {course.published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </td>
                                            <td>{course.enrolledStudents || 0}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <FiStar className="text-warning me-1" />
                                                    {course.averageRating?.toFixed(1) || 'N/A'}
                                                </div>
                                            </td>
                                            <td>${course.revenue?.toLocaleString() || 0}</td>
                                            <td>
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    as={Link}
                                                    to={`/instructor/courses/edit/${course.id}`}
                                                    className="me-2"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline-info"
                                                    size="sm"
                                                    as={Link}
                                                    to={`/courses/${course.id}`}
                                                >
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>

            {/* Recent Activity */}
            {/*<Row>*/}
            {/*    <Col lg={6} className="mb-4">*/}
            {/*        <Card className="h-100 shadow-sm">*/}
            {/*            <Card.Body>*/}
            {/*                <Card.Title className="d-flex justify-content-between align-items-center">*/}
            {/*                    <span>Recent Messages</span>*/}
            {/*                    <Button variant="link" size="sm">View All</Button>*/}
            {/*                </Card.Title>*/}
            {/*                <ListGroup variant="flush">*/}
            {/*                    {stats?.recentMessages?.map((message) => (*/}
            {/*                        <ListGroup.Item key={message._id}>*/}
            {/*                            <div className="d-flex">*/}
            {/*                                <div className="flex-shrink-0">*/}
            {/*                                    <img*/}
            {/*                                        src={message.user.avatar || '/images/avatar-placeholder.png'}*/}
            {/*                                        alt={message.user.name}*/}
            {/*                                        className="rounded-circle"*/}
            {/*                                        width="40"*/}
            {/*                                        height="40"*/}
            {/*                                    />*/}
            {/*                                </div>*/}
            {/*                                <div className="flex-grow-1 ms-3">*/}
            {/*                                    <h6 className="mb-0">{message.user.name}</h6>*/}
            {/*                                    <p className="mb-0 text-muted">{message.content}</p>*/}
            {/*                                    <small className="text-muted">*/}
            {/*                                        <FiCalendar className="me-1" />*/}
            {/*                                        {new Date(message.createdAt).toLocaleDateString()}*/}
            {/*                                    </small>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </ListGroup.Item>*/}
            {/*                    )) || (*/}
            {/*                            <ListGroup.Item className="text-center text-muted py-4">*/}
            {/*                                No recent messages*/}
            {/*                            </ListGroup.Item>*/}
            {/*                        )}*/}
            {/*                </ListGroup>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col lg={6} className="mb-4">*/}
            {/*        <Card className="h-100 shadow-sm">*/}
            {/*            <Card.Body>*/}
            {/*                <Card.Title className="d-flex justify-content-between align-items-center">*/}
            {/*                    <span>Recent Reviews</span>*/}
            {/*                    <Button variant="link" size="sm">View All</Button>*/}
            {/*                </Card.Title>*/}
            {/*                <ListGroup variant="flush">*/}
            {/*                    {stats?.recentReviews?.map((review) => (*/}
            {/*                        <ListGroup.Item key={review._id}>*/}
            {/*                            <div className="d-flex justify-content-between">*/}
            {/*                                <div>*/}
            {/*                                    <h6 className="mb-0">{review.course.title}</h6>*/}
            {/*                                    <div className="mb-1">*/}
            {/*                                        {[...Array(5)].map((_, i) => (*/}
            {/*                                            <FiStar*/}
            {/*                                                key={i}*/}
            {/*                                                className={i < review.rating ? 'text-warning' : 'text-muted'}*/}
            {/*                                                fill={i < review.rating ? 'currentColor' : 'none'}*/}
            {/*                                            />*/}
            {/*                                        ))}*/}
            {/*                                    </div>*/}
            {/*                                    <p className="mb-0 text-muted">{review.comment}</p>*/}
            {/*                                </div>*/}
            {/*                                <small className="text-muted">*/}
            {/*                                    {new Date(review.createdAt).toLocaleDateString()}*/}
            {/*                                </small>*/}
            {/*                            </div>*/}
            {/*                        </ListGroup.Item>*/}
            {/*                    )) || (*/}
            {/*                            <ListGroup.Item className="text-center text-muted py-4">*/}
            {/*                                No recent reviews*/}
            {/*                            </ListGroup.Item>*/}
            {/*                        )}*/}
            {/*                </ListGroup>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            </Container>
        </Layout>
    );
};

export default InstructorDashboard;