import React from 'react';
import { Navbar, Image, Button } from 'react-bootstrap';
import { BsBell, BsArrowLeft, BsList } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';
import { getRouteByPath } from '../../config/routes';
import './Navbar.css';

const NavbarComponent = ({ pageTitle, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = getRouteByPath(location.pathname);

    const handleBack = () => {
        navigate(-1);
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
                {currentRoute && !currentRoute.isMainRoute && (
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
            {/*<Navbar.Collapse className="justify-content-end">*/}
                <BsBell className="me-3" size={20} />
                 <div className="d-flex align-items-center text-end"> {/*<Stack direction="horizontal" gap={2}>*/}
                    <Image
                        src="https://placehold.co/40"
                        alt="Profile"
                        roundedCircle
                        className="me-2 d-none d-sm-block"
                    />
                    <div>
                        <div className="fw-bold">MUDr. Jan Suk</div>
                        <small className="text-muted d-none d-sm-block">Praktický lékař</small>
                    </div>
                </div>
            </div>
        </Navbar>
    );
};

export default NavbarComponent;
