import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={course.image || '/images/course-placeholder.jpg'} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{course.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                    {course.description.substring(0, 100)}...
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">{course.duration} hours</span>
                    <Button as={Link} to={`/courses/${course.id}`} variant="primary">
                        View Course
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CourseCard;