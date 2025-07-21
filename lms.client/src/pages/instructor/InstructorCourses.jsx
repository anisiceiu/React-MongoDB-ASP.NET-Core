import { useEffect } from 'react';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../api/courses';
import { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } from '../../slices/courseSlice';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';
import { useAuth } from '../../hooks/useAuth';

const InstructorCourses = () => {
    const dispatch = useDispatch();
    const { courses, loading, error } = useSelector((state) => state.courses);
    const { user } = useAuth();

    useEffect(() => {
        const getCourses = async () => {
            try {
                dispatch(fetchCoursesStart());
                const coursesData = await fetchInstructorCourses(user.id);
                dispatch(fetchCoursesSuccess(coursesData));
            } catch (err) {
                dispatch(fetchCoursesFailure(err.message));
            }
        };

        getCourses();
    }, [dispatch]);

    if (loading) return <Loader />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Your Courses</h1>
                <Button as={Link} to="/instructor/courses/create" variant="primary">
                    Create New Course
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Students</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>
                                <Badge bg={course.published ? 'success' : 'warning'}>
                                    {course.published ? 'Published' : 'Draft'}
                                </Badge>
                            </td>
                            <td>{course.students || 0}</td>
                            <td>
                                <Button
                                    as={Link}
                                    to={`/instructor/courses/edit/${course.id}`}
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" size="sm">
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default InstructorCourses;