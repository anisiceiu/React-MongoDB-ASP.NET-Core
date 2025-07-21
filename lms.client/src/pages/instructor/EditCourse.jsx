import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCourseById, updateCourse } from '../../api/courses';
import CourseForm from '../../pages/courses/CourseForm';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCourse } from '../../slices/courseSlice';
import Loader from '../../components/common/Loader';

const EditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentCourse } = useSelector((state) => state.courses);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCourse = async () => {
            try {
                setLoading(true);
                const course = await fetchCourseById(id);
                dispatch(setCurrentCourse(course));
            } catch (err) {
                setError(err.message || 'Failed to fetch course');
            } finally {
                setLoading(false);
            }
        };

        getCourse();
    }, [id, dispatch]);

    const handleSubmit = async (courseData) => {
        try {
            setLoading(true);
            setError('');

            const formData = new FormData();
            formData.append('title', courseData.title);
            formData.append('description', courseData.description);
            formData.append('category', courseData.category);
            formData.append('level', courseData.level);
            formData.append('price', courseData.price);
            formData.append('published', courseData.published);
            if (courseData.image) {
                formData.append('image', courseData.image);
            }
            formData.append('curriculum', JSON.stringify(courseData.curriculum));

            await updateCourse(id, formData);
            toast.success('Course updated successfully!');
            navigate('/instructor/courses');
        } catch (err) {
            setError(err.message || 'Failed to update course');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !currentCourse) return <Loader />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container className="py-5">
            <h1 className="mb-4">Edit Course</h1>
            {currentCourse && (
                <CourseForm
                    course={currentCourse}
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                />
            )}
        </Container>
    );
};

export default EditCourse;