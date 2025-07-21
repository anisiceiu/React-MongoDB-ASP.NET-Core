import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import InstructorRoute from './InstructorRoute';
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import BrowseCourses from '../pages/courses/BrowseCourses';
import CourseDetail from '../pages/courses/CourseDetail';
import Dashboard from '../pages/student/Dashboard';
import AdminDashboard from '../pages/admin/Dashboard';
import Error404 from '../pages/Error404';
import PublicLayout from '../components/layout/PublicLayout';

import InstructorDashboard from '../pages/instructor/Dashboard';
import InstructorCourses from '../pages/instructor/InstructorCourses';
import CreateCourse from '../pages/instructor/CreateCourse';
import EditCourse from '../pages/instructor/EditCourse';
import InstructorLogin from '../pages/auth/InstructorLogin';

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<BrowseCourses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/instructor-login" element={<InstructorLogin />} />
            </Route>

            {/* Student Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            // Add these routes inside the Routes component
            {/* Instructor Routes - Fixed Structure */}

            <Route element={<PrivateRoute />}>
                <Route element={<InstructorRoute />}>
                    <Route path="/instructor" element={<InstructorDashboard />} />
                    <Route path="/instructor/courses" element={<InstructorCourses />} />
                    <Route path="/instructor/courses/create" element={<CreateCourse />} />
                    <Route path="/instructor/courses/edit/:id" element={<EditCourse />} />
                </Route>
            </Route>
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

export default AppRouter;