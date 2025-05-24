import React from 'react';
import { Navbar, Button, Image } from 'react-bootstrap';
import { BsList, BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getRouteByPath } from '../../config/routes';
import { getInitials } from '../../tools/userHelper';
import './Navbar.css';

const NavbarComponent = ({ toggleSidebar, pageTitle }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const currentRoute = getRouteByPath(location.pathname);

    const handleBack = () => {
        // If on patient detail page, try to navigate back to previous page if known
        if (location.pathname.match(/^\/patient\/[^/]+$/)) {
            // Check if navigation state has fromPage
            const fromPage = location.state?.fromPage;
            if (fromPage) {
                navigate(fromPage);
            } else {
                // Fallback to dashboard
                navigate('/');
            }
        } else {
            navigate(-1);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getProfileImage = () => {
        const initials = getInitials(user) || '??';
        // Barvu můžeš měnit podle role, nebo nechat jednu univerzální
        const bgColor = user?.role === 'doctor' ? '4a90e2' : 'e24a90';
        return `https://placehold.co/40/${bgColor}/ffffff?text=${initials}`;
    };

    return (
        <Navbar
            bg="white"
            className="navbar-component border-bottom"
            style={{
                position: 'fixed',
                right: 0,
                zIndex: 1020,
                height: '72px',
                padding: '16px',
            }}
        >
            <Button
                variant="link"
                className="d-lg-none text-dark p-0 me-3"
                onClick={toggleSidebar}
            >
                <BsList size={24} />
            </Button>
            <Navbar.Brand className="d-flex align-items-center">
                {currentRoute && !currentRoute.showInSidebar && (
                    <Button
                        variant="link"
                        className="text-dark p-0 me-3"
                        onClick={handleBack}
                    >
                        <BsArrowLeft size={24} />
                    </Button>
                )}
                <h4 className="mb-0">{pageTitle}</h4>
            </Navbar.Brand>
            <Navbar.Toggle />
            <div className="ms-auto d-flex align-items-center">
                <div className="d-flex align-items-center text-end">
                    <Image
                        src={getProfileImage()}
                        alt="Profile"
                        roundedCircle
                        className="me-2 d-none d-sm-block"
                    />
                    <div>
                        <div className="fw-bold">
                            {user
                                ? `${user.prefix} ${user.first_name} ${user.last_name}`
                                : 'Nepřihlášený uživatel'}
                        </div>
                        <small className="text-muted d-none d-sm-block">
                            {user?.specialization || 'Nepřihlášený uživatel'}
                        </small>
                    </div>
                    <Button
                        variant="link"
                        className="text-dark ms-3"
                        onClick={handleLogout}
                    >
                        Odhlásit
                    </Button>
                </div>
            </div>
        </Navbar>
    );
};

export default NavbarComponent;
