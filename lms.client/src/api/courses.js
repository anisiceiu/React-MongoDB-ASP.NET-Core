import api from './axiosConfig';

export const fetchCourses = async () => {
    try {
        const response = await api.get('/courses');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchCourseById = async (id) => {
    try {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

//export const createCourse = async (courseData) => {
//    try {
//        const response = await api.post('/courses', courseData);
//        return response.data;
//    } catch (error) {
//        throw error.response.data;
//    }
//};

export const enrollCourse = async (courseId) => {
    try {
        const response = await api.post(`/courses/${courseId}/enroll`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to enroll in course';
    }
};

// Add this if you need to check enrollment status
export const checkEnrollment = async (courseId) => {
    try {
        const response = await api.get(`/courses/${courseId}/enrollment`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to check enrollment status';
    }
};

export const fetchInstructorStats = async () => {
    try {
        const response = await api.get('/instructor/stats');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch instructor stats';
    }
};

//export const fetchInstructorCourses = async () => {
//    try {
//        const response = await api.get('/instructor/courses');
//        return response.data;
//    } catch (error) {
//        throw error.response?.data?.message || 'Failed to fetch instructor courses';
//    }
//};

export const fetchInstructorCourses = async (userId) => {
    try {
        const response = await api.get(`/courses/instructor/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createCourse = async (courseData) => {
    try {
        const response = await api.post('/courses', courseData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateCourse = async (id, courseData) => {
    try {
        const response = await api.put(`/courses/${id}`, courseData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getCourseEnrollments = async (courseId) => {
    try {
        const response = await api.get(`/courses/${courseId}/enrollments`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getMyEnrollments = async () => {
    try {
        const response = await api.get('/courses/my-enrollments');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};