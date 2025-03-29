import React from 'react';
import { Navbar, Image, Stack, Button } from 'react-bootstrap';
import { BsBell, BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useLocation } from 'react-router-dom';

const NavbarComponent = ({ pageTitle }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Navbar
            bg="white"
            className="border-bottom"
            style={{
                position: 'fixed',
                right: 0,
                left: '250px',
                zIndex: 1020,
                height: '72px',
                padding: '16px',
            }}
        >
            <Navbar.Brand className="d-flex align-items-center">
                {location.pathname !== '/' && (
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
            <Navbar.Collapse className="justify-content-end">
                <BsBell className="me-3" size={20} />
                <Stack direction="horizontal" gap={2}>
                    <Image
                        src="https://placehold.co/40"
                        alt="Profile"
                        roundedCircle
                    />
                    <div>
                        <div className="fw-bold">MUDr. Jan Suk</div>
                        <small className="text-muted">Praktický lékař</small>
                    </div>
                </Stack>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
