import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from '../utils/authUtils';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const token = localStorage.getItem('token');
    const isValid = isTokenValid(token);

    if (!isValid) {
        return <Navigate to="/login" replace />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;