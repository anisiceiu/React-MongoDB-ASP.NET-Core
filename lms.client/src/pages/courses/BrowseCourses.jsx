import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../api/courses';
import { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } from '../../slices/courseSlice';
import CourseCard from '../../components/common/Card/CourseCard';
import Loader from '../../components/common/Loader';

const BrowseCourses = () => {
    const dispatch = useDispatch();
    const { courses, loading, error } = useSelector((state) => state.courses);

    useEffect(() => {
        const getCourses = async () => {
            try {
                dispatch(fetchCoursesStart());
                const coursesData = await fetchCourses();
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
            <h1 className="mb-4">Browse Courses</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {courses.map((course) => (
                    <Col key={course.id}>
                        <CourseCard course={course} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BrowseCourses;