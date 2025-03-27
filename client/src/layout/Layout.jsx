import React from "react";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";

const Layout = ({ setBooks }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow-1">
        <Container className="py-4">
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default Layout;