import { Form, Row, Col, Button, Card, Alert } from 'react-bootstrap';
import { useState } from 'react';
/*import ReactQuill from 'react-quill';*/
/*import 'react-quill/dist/quill.snow.css';*/

const CourseForm = ({
    course = {},
    onSubmit,
    loading,
    error
}) => {
    const [formData, setFormData] = useState({
        title: course.title || '',
        description: course.description || '',
        category: course.category || '',
        level: course.level || 'beginner',
        price: course.price || 0,
        published: course.published || false,
        image: null,
        curriculum: course.curriculum || []
    });

    const [newSection, setNewSection] = useState({
        title: '',
        lectures: [{ title: '', videoUrl: '' }]
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDescriptionChange = (e) => {
        setFormData(prev => ({
            ...prev,
            description: e.target.value
        }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleAddSection = () => {
        if (!newSection.title) return;

        setFormData(prev => ({
            ...prev,
            curriculum: [...prev.curriculum, newSection]
        }));

        setNewSection({
            title: '',
            lectures: [{ title: '', videoUrl: '' }]
        });
    };

    const handleAddLecture = (sectionIndex) => {
        const updatedCurriculum = [...formData.curriculum];
        updatedCurriculum[sectionIndex].lectures.push({ title: '', videoUrl: '' });
        setFormData(prev => ({
            ...prev,
            curriculum: updatedCurriculum
        }));
    };

    const handleSectionChange = (e, sectionIndex) => {
        const { name, value } = e.target;
        const updatedCurriculum = [...formData.curriculum];
        updatedCurriculum[sectionIndex][name] = value;
        setFormData(prev => ({
            ...prev,
            curriculum: updatedCurriculum
        }));
    };

    const handleLectureChange = (e, sectionIndex, lectureIndex) => {
        const { name, value } = e.target;
        const updatedCurriculum = [...formData.curriculum];
        updatedCurriculum[sectionIndex].lectures[lectureIndex][name] = value;
        setFormData(prev => ({
            ...prev,
            curriculum: updatedCurriculum
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Basic Information</Card.Title>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="title">
                            <Form.Label>Course Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Machine Learning">Machine Learning</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        {/*<Form.T*/}
                        {/*    theme="snow"*/}
                        {/*    value={formData.description}*/}
                        {/*    onChange={handleDescriptionChange}*/}
                        {/*    className="mb-3"*/}
                        {/*    style={{ height: '200px' }}*/}
                        {/*/>*/}
                        <Form.Control as="textarea" value={formData.description} onChange={handleDescriptionChange} rows={3} />
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="level">
                            <Form.Label>Level</Form.Label>
                            <Form.Select
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="price">
                            <Form.Label>Price ($)</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Course Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Form.Group>

                    <Form.Check
                        type="switch"
                        id="published"
                        label="Publish Course"
                        name="published"
                        checked={formData.published}
                        onChange={handleChange}
                    />
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Curriculum</Card.Title>

                    {formData.curriculum.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-4 border p-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Section Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={section.title}
                                    onChange={(e) => handleSectionChange(e, sectionIndex)}
                                    required
                                />
                            </Form.Group>

                            {section.lectures.map((lecture, lectureIndex) => (
                                <div key={lectureIndex} className="mb-3 ps-3 border-start">
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Lecture Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    value={lecture.title}
                                                    onChange={(e) => handleLectureChange(e, sectionIndex, lectureIndex)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Video URL</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="videoUrl"
                                                    value={lecture.videoUrl}
                                                    onChange={(e) => handleLectureChange(e, sectionIndex, lectureIndex)}
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            ))}

                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleAddLecture(sectionIndex)}
                            >
                                Add Lecture
                            </Button>
                        </div>
                    ))}

                    <div className="border p-3 mb-3">
                        <Form.Group className="mb-3">
                            <Form.Label>New Section Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={newSection.title}
                                onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleAddSection}>
                            Add Section
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <div className="d-grid">
                <Button type="submit" variant="primary" size="lg" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Course'}
                </Button>
            </div>
        </Form>
    );
};

export default CourseForm;