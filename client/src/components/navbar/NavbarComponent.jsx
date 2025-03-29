import React from 'react';
import { Navbar, Image, Stack } from 'react-bootstrap';
import { BsBell } from 'react-icons/bs';

const NavbarComponent = ({ pageTitle }) => {
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
            <Navbar.Brand>
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
