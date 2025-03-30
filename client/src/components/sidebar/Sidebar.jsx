import React from 'react';
import { Nav, Image } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../config/routes';
import logo from '../../assets/logo.svg';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const location = useLocation();
    const sidebarRoutes = routes.filter((route) => route.showInSidebar);
    const topRoutes = sidebarRoutes.filter((route) => route.position === 'top');
    const bottomRoutes = sidebarRoutes.filter(
        (route) => route.position === 'bottom',
    );

    const isActive = (path) => location.pathname === path;

    const renderNavLinks = (routes) =>
        routes.map((route) => (
            <Nav.Link
                key={route.path}
                as={Link}
                to={route.path}
                className={`sidebar-nav-link d-flex align-items-center ${
                    isActive(route.path) ? 'active' : ''
                }`}
            >
                <route.icon className="me-2" /> {route.name}
            </Nav.Link>
        ));

    return (
        <>
            {/* Overlay pro mobilní zařízení */}
            <div
                className={`sidebar-overlay ${isOpen ? 'show' : ''}`}
                onClick={onClose}
            />
            <div
                className={`sidebar bg-white border-end d-flex flex-column ${
                    isOpen ? 'show' : ''
                }`}
                style={{ width: '250px', height: '100vh' }}
            >
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

                <div className="d-flex flex-column flex-grow-1">
                    <Nav className="flex-column p-3">
                        {renderNavLinks(topRoutes)}
                    </Nav>

                    <Nav className="flex-column p-3 mt-auto">
                        {renderNavLinks(bottomRoutes)}
                    </Nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
