// src/components/courses/EnrollmentList.jsx
import { useState, useEffect } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import { getCourseEnrollments } from '../../api/courses';

const EnrollmentList = ({ courseId }) => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadEnrollments = async () => {
            try {
                const data = await getCourseEnrollments(courseId);
                setEnrollments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadEnrollments();
    }, [courseId]);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Enrollment Date</th>
                    <th>Progress</th>
                </tr>
            </thead>
            <tbody>
                {enrollments.map((enrollment) => (
                    <tr key={enrollment.userId}>
                        <td>{enrollment.userName}</td>
                        <td>{enrollment.email}</td>
                        <td>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</td>
                        <td>{enrollment.completionStatus}%</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default EnrollmentList;