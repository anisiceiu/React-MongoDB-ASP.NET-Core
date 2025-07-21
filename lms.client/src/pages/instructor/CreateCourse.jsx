import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../api/courses';
import CourseForm from '../../pages/courses/CourseForm';
import { toast } from 'react-toastify';
import Layout from '../../components/layout/Layout';

const CreateCourse = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

            await createCourse(formData);
            toast.success('Course created successfully!');
            navigate('/instructor/courses');
        } catch (err) {
            setError(err.message || 'Failed to create course');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
        <Container className="py-5">
            <h1 className="mb-4">Create New Course</h1>
            <CourseForm
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
            />
            </Container>
        </Layout>
    );
};

export default CreateCourse;