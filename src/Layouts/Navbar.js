import React from "react";

import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Navv = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>DentOne</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/paypal">
              <Nav.Link>Paypal</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/free">
              <Nav.Link>Free</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/s3test">
              <Nav.Link>S3 Test</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/toserver">
              <Nav.Link>Upload server</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/multiupload">
              <Nav.Link>MultiUpload</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text></Navbar.Text>
          <NavDropdown title="User" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">Sign Out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navv;
