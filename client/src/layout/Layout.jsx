import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import NavbarComponent from '../components/navbar/NavbarComponent';
import { getRouteByPath } from '../config/routes';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const getPageTitle = (pathname) => {
        const route = getRouteByPath(pathname);
        return route ? route.name : '';
    };

    // Zavře sidebar při změně cesty na mobilních zařízeních
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="min-vh-100 d-flex bg-light">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <div className="flex-grow-1 d-flex flex-column">
                <header>
                    <NavbarComponent
                        pageTitle={getPageTitle(location.pathname)}
                        toggleSidebar={toggleSidebar}
                    />
                </header>
                <Container
                    fluid
                    className="p-3 flex-grow-1"
                    style={{
                        marginTop: '72px',
                    }}
                >
                    <div className="m-1 p-3 bg-white rounded border">
                        <Outlet />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Layout;
