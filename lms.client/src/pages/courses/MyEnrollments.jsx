// components/MyEnrollments.jsx
import { useEffect, useState } from 'react';
import { Card, Spinner, ProgressBar, Button } from 'react-bootstrap';
import { getMyEnrollments } from '../../api/courses';

const MyEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const data = await getMyEnrollments();
                setEnrollments(data);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, []);

    if (loading) return <Spinner animation="border" />;

    return (
        <div className="enrollment-list">
            <h3>My Courses</h3>
            {enrollments.length === 0 ? (
                <p>You're not enrolled in any courses yet.</p>
            ) : (
                enrollments.map((enrollment) => (
                    <Card key={enrollment.id} className="mb-3">
                        <Card.Body>
                            <div className="d-flex">
                                {/*<img*/}
                                {/*    src={enrollment.courseId.image}*/}
                                {/*    alt={enrollment.courseId.title}*/}
                                {/*    style={{ width: '120px', height: '80px', objectFit: 'cover' }}*/}
                                {/*    className="me-3"*/}
                                {/*/>*/}
                                <div className="flex-grow-1">
                                    <Card.Title>{enrollment.title}</Card.Title>
                                    <Card.Text className="text-muted">
                                        Instructor: {enrollment.instructor?.name} {enrollment.instructorId }
                                    </Card.Text>
                                    <ProgressBar
                                        now={enrollment.progress || 0}
                                        label={`${enrollment.progress || 0}%`}
                                        className="mb-2"
                                    />
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        href={`/learn/${enrollment.id}`}
                                    >
                                        Continue Learning
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

export default MyEnrollments;