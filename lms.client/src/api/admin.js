import api from './axiosConfig';

export const fetchAdminStats = async () => {
    try {
        const response = await api.get('/admin/stats');
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch admin statistics';
    }
};

export const fetchRecentUsers = async (limit = 5) => {
    try {
        const response = await api.get('/admin/users/recent', {
            params: { limit }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch recent users';
    }
};

export const fetchRecentCourses = async (limit = 5) => {
    try {
        const response = await api.get('/admin/courses/recent', {
            params: { limit }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch recent courses';
    }
};

export const fetchRevenueData = async ({ startDate, endDate }) => {
    try {
        const response = await api.get('/admin/revenue', {
            params: {
                startDate,
                endDate
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch revenue data';
    }
};

export const fetchEnrollmentData = async ({ startDate, endDate }) => {
    try {
        const response = await api.get('/admin/enrollments', {
            params: {
                startDate,
                endDate
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch enrollment data';
    }
};

export const manageUser = async (userId, action, data = {}) => {
    try {
        const response = await api.patch(`/admin/users/${userId}/${action}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || `Failed to ${action} user`;
    }
};

export const manageCourse = async (courseId, action, data = {}) => {
    try {
        const response = await api.patch(`/admin/courses/${courseId}/${action}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || `Failed to ${action} course`;
    }
};

export const getSystemLogs = async (page = 1, limit = 20) => {
    try {
        const response = await api.get('/admin/logs', {
            params: { page, limit }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch system logs';
    }
};

export const updateSystemSettings = async (settings) => {
    try {
        const response = await api.put('/admin/settings', settings);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to update system settings';
    }
};

// User management functions
export const getUsers = async (filters = {}, page = 1, limit = 20) => {
    try {
        const response = await api.get('/admin/users', {
            params: { ...filters, page, limit }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch users';
    }
};

export const getUserDetails = async (userId) => {
    try {
        const response = await api.get(`/admin/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch user details';
    }
};

// Course management functions
export const getCourses = async (filters = {}, page = 1, limit = 20) => {
    try {
        const response = await api.get('/admin/courses', {
            params: { ...filters, page, limit }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch courses';
    }
};

export const getCourseDetails = async (courseId) => {
    try {
        const response = await api.get(`/admin/courses/${courseId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch course details';
    }
};

// Analytics functions
export const getPlatformAnalytics = async (period = '30d') => {
    try {
        const response = await api.get('/admin/analytics/platform', {
            params: { period }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch platform analytics';
    }
};

export const getUserAnalytics = async (userId) => {
    try {
        const response = await api.get(`/admin/analytics/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch user analytics';
    }
};

export const getCourseAnalytics = async (courseId) => {
    try {
        const response = await api.get(`/admin/analytics/courses/${courseId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Failed to fetch course analytics';
    }
};