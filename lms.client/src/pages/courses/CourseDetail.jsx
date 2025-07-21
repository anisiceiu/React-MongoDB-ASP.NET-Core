import { useEffect, useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Tab,
    Tabs,
    ListGroup,
    Badge,
    Alert,
    Spinner,
    Accordion
} from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById, enrollCourse } from '../../api/courses';
import { setCurrentCourse } from '../../slices/courseSlice';
import { FaStar, FaRegStar, FaPlay, FaLock, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import EnrollmentList from '../../pages/courses/EnrollmentList';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth();
    const { currentCourse, loading, error } = useSelector((state) => state.courses);
    const [activeTab, setActiveTab] = useState('overview');
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(0);

    useEffect(() => {
        const getCourse = async () => {
            try {
                const course = await fetchCourseById(id);
                dispatch(setCurrentCourse(course));

                // Check if user is enrolled
                if (isAuthenticated && user?.enrolledCourses?.includes(course.id)) {
                    setIsEnrolled(true);
                    setSelectedCourse(id);
                }
            } catch (err) {
                console.error('Failed to fetch course:', err);
                toast.error('Failed to load course details');
            }
        };

        getCourse();

        return () => {
            dispatch(setCurrentCourse(null));
        };
    }, [id, dispatch, isAuthenticated, user]);

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: `/courses/${id}` } });
            return;
        }

        try {
            setIsEnrolling(true);
            await enrollCourse(id);
            setIsEnrolled(true);
            toast.success('Successfully enrolled in the course!');
        } catch (err) {
            toast.error(err.message || 'Failed to enroll in course');
        } finally {
            setIsEnrolling(false);
        }
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-warning" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStar key={i} className="text-warning" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-warning" />);
            }
        }

        return stars;
    };

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
            <Container className="py-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!currentCourse) {
        return (
            <Container className="py-5">
                <Alert variant="info">Course not found</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Row>
                <Col lg={8}>
                    <h1>{currentCourse.title}</h1>

                    <div className="d-flex align-items-center mb-4">
                        {renderRatingStars(currentCourse.rating || 0)}
                        <span className="ms-2 text-muted">
                            ({currentCourse.ratingCount || 0} ratings)
                        </span>
                        <span className="ms-3">
                            <Badge bg="info">{currentCourse.level}</Badge>
                        </span>
                        {currentCourse.category && (
                            <span className="ms-2">
                                <Badge bg="secondary">{currentCourse.category}</Badge>
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <img
                            src={currentCourse.image || '/images/course-placeholder.jpg'}
                            alt={currentCourse.title}
                            className="img-fluid rounded"
                            style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mb-4"
                    >
                        <Tab eventKey="overview" title="Overview">
                            <div className="mt-3">
                                <h4>About This Course</h4>
                                <div dangerouslySetInnerHTML={{ __html: currentCourse.description }} />
                            </div>
                        </Tab>
                        <Tab eventKey="curriculum" title="Curriculum">
                            <div className="mt-3">
                                <h4>Course Content</h4>
                                <Accordion defaultActiveKey="0" className="mt-3">
                                    {currentCourse.curriculum?.map((section, sectionIndex) => (
                                        <Accordion.Item key={sectionIndex} eventKey={sectionIndex.toString()}>
                                            <Accordion.Header>
                                                <div className="d-flex justify-content-between w-100 pe-3">
                                                    <span>{section.title}</span>
                                                    <span className="text-muted">
                                                        {section.lectures.length} lectures • {section.duration || '0'} min
                                                    </span>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <ListGroup variant="flush">
                                                    {section.lectures.map((lecture, lectureIndex) => (
                                                        <ListGroup.Item key={lectureIndex} className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                {isEnrolled ? (
                                                                    <FaPlay className="text-primary me-2" />
                                                                ) : (
                                                                    <FaLock className="text-muted me-2" />
                                                                )}
                                                                {lecture.title}
                                                            </div>
                                                            <span className="text-muted">{lecture.duration || '0'} min</span>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </div>
                        </Tab>
                        <Tab eventKey="instructor" title="Instructor">
                            <div className="mt-3">
                                <h4>About the Instructor</h4>
                                <Card className="mt-3">
                                    <Card.Body>
                                        <Row>
                                            <Col md={3} className="text-center">
                                                <img
                                                    src={currentCourse.instructor?.avatar || '/images/avatar-placeholder.png'}
                                                    alt={currentCourse.instructor?.name}
                                                    className="rounded-circle mb-3"
                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                                <h5>{currentCourse.instructor?.name}</h5>
                                                <p className="text-muted">{currentCourse.instructor?.title}</p>
                                            </Col>
                                            <Col md={9}>
                                                <p>{currentCourse.instructor?.bio || 'No bio available'}</p>
                                                <div className="d-flex">
                                                    <div className="me-4">
                                                        <h6>Courses</h6>
                                                        <p>{currentCourse.instructor?.courseCount || 0}</p>
                                                    </div>
                                                    <div className="me-4">
                                                        <h6>Students</h6>
                                                        <p>{currentCourse.instructor?.studentCount || 0}</p>
                                                    </div>
                                                    <div>
                                                        <h6>Rating</h6>
                                                        <p>
                                                            {currentCourse.instructor?.rating || 0}
                                                            <FaStar className="text-warning ms-1" />
                                                        </p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Tab>
                        <Tab eventKey="enroll" title="Enrollments">
                            <Row className="mb-4">
                                <Col lg={6} className="mb-4">
                                    <Card className="h-100 shadow-sm">
                                        <Card.Body>
                                           
                                            {currentCourse && (
                                                <div className="mt-4">
                                                    <h4>Enrollments for {currentCourse.title}</h4>
                                                    <EnrollmentList courseId={currentCourse.id} />
                                                </div>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </Col>

                <Col lg={4}>
                    <Card style={{ top: '20px' }}>
                        <Card.Body>
                            <div className="text-center mb-3">
                                <h3>
                                    {currentCourse.price > 0 ? (
                                        <>${currentCourse.price}</>
                                    ) : (
                                        <span className="text-success">Free</span>
                                    )}
                                </h3>
                                {currentCourse.originalPrice && currentCourse.price < currentCourse.originalPrice && (
                                    <div>
                                        <s className="text-muted">${currentCourse.originalPrice}</s>
                                        <span className="ms-2 text-danger">
                                            {Math.round((1 - currentCourse.price / currentCourse.originalPrice) * 100)}% off
                                        </span>
                                    </div>
                                )}
                            </div>

                            {isEnrolled ? (
                                <Button
                                    variant="success"
                                    className="w-100 mb-3"
                                    as={Link}
                                    to={`/learn/${currentCourse._id}`}
                                >
                                    <FaCheck className="me-2" />
                                    Continue Learning
                                </Button>
                            ) : (
                                <Button
                                    variant="primary"
                                    className="w-100 mb-3"
                                    onClick={handleEnroll}
                                    disabled={isEnrolling}
                                >
                                    {isEnrolling ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                            <span className="ms-2">Enrolling...</span>
                                        </>
                                    ) : (
                                        'Enroll Now'
                                    )}
                                </Button>
                            )}

                            <ListGroup variant="flush" className="mb-3">
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Duration</span>
                                    <span>{currentCourse.totalDuration || '0'} hours</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Lectures</span>
                                    <span>{currentCourse.totalLectures || '0'}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Enrolled</span>
                                    <span>{currentCourse.enrolledStudents || '0'} students</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Language</span>
                                    <span>{currentCourse.language || 'English'}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>Certificate</span>
                                    <span>{currentCourse.certificate ? 'Yes' : 'No'}</span>
                                </ListGroup.Item>
                            </ListGroup>

                            <div className="text-center">
                                <p className="text-muted">30-Day Money-Back Guarantee</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CourseDetail;