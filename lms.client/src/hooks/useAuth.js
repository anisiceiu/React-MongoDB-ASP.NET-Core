import { useDispatch, useSelector } from 'react-redux';
import { login, register, logout } from '../api/auth';
import { loginSuccess, logout as logoutAction } from '../slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const handleLogin = async (credentials) => {
        try {
            const response = await login(credentials);
            dispatch(loginSuccess({
                user: response.user,
                token: response.token
            }));

            // 2. Properly store in localStorage
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const handleRegister = async (userData) => {
        try {
            const response = await register(userData);
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(logoutAction());
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Initialize user from localStorage if exists
    const initializeUser = () => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    };

    return {
        user: user || initializeUser(), // Fallback to localStorage,
        isAuthenticated,
        loading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
    };
};