import { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Badge,
    Spinner,
    ProgressBar,
    Button,
    Dropdown,
    Alert
} from 'react-bootstrap';
import {
    FiUsers,
    FiBook,
    FiDollarSign,
    FiBarChart2,
    FiCalendar,
    FiRefreshCw
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAdminStats,
    fetchRecentUsers,
    fetchRecentCourses,
    fetchRevenueData
} from '../../api/admin';
//import { Line, Bar, Pie } from 'react-chartjs-2';
//import {
//    Chart as ChartJS,
//    CategoryScale,
//    LinearScale,
//    PointElement,
//    LineElement,
//    BarElement,
//    ArcElement,
//    Title,
//    Tooltip,
//    Legend
//} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

//// Register ChartJS components
//ChartJS.register(
//    CategoryScale,
//    LinearScale,
//    PointElement,
//    LineElement,
//    BarElement,
//    ArcElement,
//    Title,
//    Tooltip,
//    Legend
//);

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [activeChart, setActiveChart] = useState('revenue');

    const {
        stats,
        recentUsers,
        recentCourses,
        revenueData,
        enrollmentData,
        loading: reduxLoading,
        error: reduxError
    } = useSelector((state) => state.admin);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                await Promise.all([
                    dispatch(fetchAdminStats()),
                    dispatch(fetchRecentUsers()),
                    dispatch(fetchRecentCourses()),
                    dispatch(fetchRevenueData({
                        startDate: startDate?.toISOString(),
                        endDate: endDate?.toISOString()
                    }))
                ]);
            } catch (err) {
                setError(err.message || 'Failed to load dashboard data');
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [dispatch, startDate, endDate]);

    const handleRefresh = () => {
        setError('');
        dispatch(fetchAdminStats());
        dispatch(fetchRecentUsers());
        dispatch(fetchRecentCourses());
        dispatch(fetchRevenueData({
            startDate: startDate?.toISOString(),
            endDate: endDate?.toISOString()
        }));
    };

    const revenueChartData = {
        labels: revenueData?.labels || [],
        datasets: [
            {
                label: 'Revenue',
                data: revenueData?.data || [],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                fill: true
            }
        ]
    };

    const enrollmentChartData = {
        labels: enrollmentData?.labels || [],
        datasets: [
            {
                label: 'Enrollments',
                data: enrollmentData?.data || [],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };

    const courseStatusData = {
        labels: ['Published', 'Draft', 'Archived'],
        datasets: [
            {
                data: [
                    stats?.publishedCourses || 0,
                    stats?.draftCourses || 0,
                    stats?.archivedCourses || 0
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    if (loading || reduxLoading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error || reduxError) {
        return (
            <Container className="py-5">
                <Alert variant="danger">{error || reduxError}</Alert>
                <Button onClick={handleRefresh} variant="primary">
                    <FiRefreshCw className="me-2" />
                    Try Again
                </Button>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Admin Dashboard</h1>
                <div className="d-flex align-items-center">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => setDateRange(update)}
                        placeholderText="Select date range"
                        className="form-control me-2"
                        dateFormat="MMM d, yyyy"
                    />
                    <Button variant="outline-primary" onClick={handleRefresh}>
                        <FiRefreshCw />
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <Row className="mb-4">
                <Col xl={3} lg={6} md={6} sm={12} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col xs={8}>
                                    <h6 className="text-uppercase text-muted mb-0">Total Users</h6>
                                    <h3 className="mb-0">{stats?.totalUsers || 0}</h3>
                                    <small className="text-muted">
                                        <Badge bg={stats?.userGrowth >= 0 ? 'success' : 'danger'}>
                                            {stats?.userGrowth >= 0 ? '+' : ''}{stats?.userGrowth || 0}% from last month
                                        </Badge>
                                    </small>
                                </Col>
                                <Col xs={4} className="text-end">
                                    <div className="icon-shape bg-primary text-white rounded-circle p-3">
                                        <FiUsers size={24} />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={3} lg={6} md={6} sm={12} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col xs={8}>
                                    <h6 className="text-uppercase text-muted mb-0">Total Courses</h6>
                                    <h3 className="mb-0">{stats?.totalCourses || 0}</h3>
                                    <small className="text-muted">
                                        {stats?.activeCourses || 0} active
                                    </small>
                                </Col>
                                <Col xs={4} className="text-end">
                                    <div className="icon-shape bg-info text-white rounded-circle p-3">
                                        <FiBook size={24} />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={3} lg={6} md={6} sm={12} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col xs={8}>
                                    <h6 className="text-uppercase text-muted mb-0">Revenue</h6>
                                    <h3 className="mb-0">${stats?.totalRevenue?.toLocaleString() || 0}</h3>
                                    <small className="text-muted">
                                        <Badge bg={stats?.revenueGrowth >= 0 ? 'success' : 'danger'}>
                                            {stats?.revenueGrowth >= 0 ? '+' : ''}{stats?.revenueGrowth || 0}% from last month
                                        </Badge>
                                    </small>
                                </Col>
                                <Col xs={4} className="text-end">
                                    <div className="icon-shape bg-success text-white rounded-circle p-3">
                                        <FiDollarSign size={24} />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xl={3} lg={6} md={6} sm={12} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Row className="align-items-center">
                                <Col xs={8}>
                                    <h6 className="text-uppercase text-muted mb-0">Enrollments</h6>
                                    <h3 className="mb-0">{stats?.totalEnrollments?.toLocaleString() || 0}</h3>
                                    <ProgressBar now={stats?.enrollmentRate || 0} label={`${stats?.enrollmentRate || 0}%`} />
                                </Col>
                                <Col xs={4} className="text-end">
                                    <div className="icon-shape bg-warning text-white rounded-circle p-3">
                                        <FiBarChart2 size={24} />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            {/*<Row className="mb-4">*/}
            {/*    <Col lg={8} className="mb-4">*/}
            {/*        <Card className="h-100 shadow-sm">*/}
            {/*            <Card.Body>*/}
            {/*                <div className="d-flex justify-content-between align-items-center mb-3">*/}
            {/*                    <Card.Title>Analytics</Card.Title>*/}
            {/*                    <Dropdown>*/}
            {/*                        <Dropdown.Toggle variant="outline-secondary" size="sm">*/}
            {/*                            {activeChart === 'revenue' ? 'Revenue' : 'Enrollments'}*/}
            {/*                        </Dropdown.Toggle>*/}
            {/*                        <Dropdown.Menu>*/}
            {/*                            <Dropdown.Item onClick={() => setActiveChart('revenue')}>Revenue</Dropdown.Item>*/}
            {/*                            <Dropdown.Item onClick={() => setActiveChart('enrollments')}>Enrollments</Dropdown.Item>*/}
            {/*                        </Dropdown.Menu>*/}
            {/*                    </Dropdown>*/}
            {/*                </div>*/}
            {/*                {activeChart === 'revenue' ? (*/}
            {/*                    <Line*/}
            {/*                        data={revenueChartData}*/}
            {/*                        options={{*/}
            {/*                            responsive: true,*/}
            {/*                            plugins: {*/}
            {/*                                legend: {*/}
            {/*                                    position: 'top',*/}
            {/*                                },*/}
            {/*                                tooltip: {*/}
            {/*                                    callbacks: {*/}
            {/*                                        label: function (context) {*/}
            {/*                                            return `$${context.raw.toLocaleString()}`;*/}
            {/*                                        }*/}
            {/*                                    }*/}
            {/*                                }*/}
            {/*                            },*/}
            {/*                            scales: {*/}
            {/*                                y: {*/}
            {/*                                    ticks: {*/}
            {/*                                        callback: function (value) {*/}
            {/*                                            return `$${value.toLocaleString()}`;*/}
            {/*                                        }*/}
            {/*                                    }*/}
            {/*                                }*/}
            {/*                            }*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                ) : (*/}
            {/*                    <Bar*/}
            {/*                        data={enrollmentChartData}*/}
            {/*                        options={{*/}
            {/*                            responsive: true,*/}
            {/*                            plugins: {*/}
            {/*                                legend: {*/}
            {/*                                    position: 'top',*/}
            {/*                                }*/}
            {/*                            }*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                )}*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col lg={4} className="mb-4">*/}
            {/*        <Card className="h-100 shadow-sm">*/}
            {/*            <Card.Body>*/}
            {/*                <Card.Title className="mb-3">Course Status</Card.Title>*/}
            {/*                <div style={{ height: '300px' }}>*/}
            {/*                    <Pie*/}
            {/*                        data={courseStatusData}*/}
            {/*                        options={{*/}
            {/*                            responsive: true,*/}
            {/*                            maintainAspectRatio: false,*/}
            {/*                            plugins: {*/}
            {/*                                legend: {*/}
            {/*                                    position: 'bottom',*/}
            {/*                                },*/}
            {/*                                tooltip: {*/}
            {/*                                    callbacks: {*/}
            {/*                                        label: function (context) {*/}
            {/*                                            return `${context.label}: ${context.raw}`;*/}
            {/*                                        }*/}
            {/*                                    }*/}
            {/*                                }*/}
            {/*                            }*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </Card.Body>*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}

            {/* Recent Activity */}
            <Row>
                <Col lg={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-3">Recent Users</Card.Title>
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentUsers?.map((user) => (
                                        <tr key={user._id}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={user.avatar || '/images/avatar-placeholder.png'}
                                                        alt={user.name}
                                                        className="rounded-circle me-2"
                                                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                                    />
                                                    {user.name}
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Badge bg={
                                                    user.role === 'admin' ? 'danger' :
                                                        user.role === 'instructor' ? 'info' : 'primary'
                                                }>
                                                    {user.role}
                                                </Badge>
                                            </td>
                                            <td>{format(new Date(user.createdAt), 'MMM d, yyyy')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title className="mb-3">Recent Courses</Card.Title>
                            <Table hover responsive>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Instructor</th>
                                        <th>Status</th>
                                        <th>Students</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentCourses?.map((course) => (
                                        <tr key={course._id}>
                                            <td>{course.title}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        src={course.instructor?.avatar || '/images/avatar-placeholder.png'}
                                                        alt={course.instructor?.name}
                                                        className="rounded-circle me-2"
                                                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                                                    />
                                                    {course.instructor?.name}
                                                </div>
                                            </td>
                                            <td>
                                                <Badge bg={course.published ? 'success' : 'warning'}>
                                                    {course.published ? 'Published' : 'Draft'}
                                                </Badge>
                                            </td>
                                            <td>{course.enrolledStudents || 0}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard;