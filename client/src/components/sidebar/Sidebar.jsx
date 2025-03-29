import React from 'react';
import { Nav, Stack, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import {
    BsGrid,
    BsPeople,
    BsCalendar,
    BsCalendarCheck,
    BsQuestionCircle,
    BsGear,
} from 'react-icons/bs';
import './css/Sidebar.css';
import logo from '../../assets/logo.svg';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="sidebar bg-white border-end">
            <div
                className="border-bottom"
                style={{ height: '72px', padding: '16px' }}
            >
                <Image
                    src={logo}
                    alt="MediPractise"
                    fluid
                    style={{ height: '40px' }}
                />
            </div>

            <Stack className="flex-grow-1">
                <Nav className="flex-column p-3">
                    <Nav.Link
                        as={Link}
                        to="/bloodSamples"
                        className={`d-flex align-items-center ${
                            isActive('/bloodSamples')
                                ? 'text-primary active'
                                : 'text-secondary'
                        }`}
                    >
                        <BsGrid className="me-2" /> Odběry
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/"
                        className={`d-flex align-items-center ${
                            isActive('/')
                                ? 'text-primary active'
                                : 'text-secondary'
                        }`}
                    >
                        <BsPeople className="me-2" /> Karty pacientů
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/reservations"
                        className={`d-flex align-items-center ${
                            isActive('/reservations')
                                ? 'text-primary active'
                                : 'text-secondary'
                        }`}
                    >
                        <BsCalendar className="me-2" /> Rezervační systém
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/appointments"
                        className={`d-flex align-items-center ${
                            isActive('/appointments')
                                ? 'text-primary active'
                                : 'text-secondary'
                        }`}
                    >
                        <BsCalendarCheck className="me-2" /> Dnešní schůzky
                    </Nav.Link>
                </Nav>

                <Nav className="flex-column p-3 mt-auto">
                    <Nav.Link
                        as={Link}
                        to="/help"
                        className={`d-flex align-items-center ${
                            isActive('/help')
                                ? 'text-primary active'
                                : 'text-secondary'
                        }`}
                    >
                        <BsQuestionCircle className="me-2" /> Pomoc
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/settings"
                        className={`d-flex align-items-center ${
                            isActive('/settings')
                                ? 'text-primary active'
                                : 'text-secondary'
                        }`}
                    >
                        <BsGear className="me-2" /> Nastavení
                    </Nav.Link>
                </Nav>
            </Stack>
        </div>
    );
};

export default Sidebar;
