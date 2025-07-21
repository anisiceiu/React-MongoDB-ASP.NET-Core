import { Container } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="py-4">
                <Container>{children}</Container>
            </main>
            <Footer />
        </>
    );
};

export default Layout;