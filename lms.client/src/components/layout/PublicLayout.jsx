// src/components/layout/PublicLayout.jsx
import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';
import Footer from './Footer'; // Your footer component

const PublicLayout = () => {
    return (
        <>
            <PublicNavbar />
            <main className="flex-shrink-0">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default PublicLayout;