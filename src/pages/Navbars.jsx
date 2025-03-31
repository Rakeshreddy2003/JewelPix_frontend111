import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
const expand = false;
const Navbars = () => {
  return (
    <>
      {" "}
      <Navbar
        key={expand}
        expand={expand}
        style={{ backgroundColor: "#507691" }}
        className=" background"
      >
        <Container fluid>
          <div><Navbar.Brand style={{color:"white"}} href="#">Jiwel pix</Navbar.Brand>
          <Button variant="outline-light" className="me-2">
            Upload
          </Button></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          
          <div>
            <Button variant="outline-light" className="me-2">
              Login
            </Button>
            <Button variant="outline-light">Sign Up</Button>
          </div>

          <Navbar.Toggle style={{backgroundColor:"white"}} aria-controls={`offcanvasNavbar-expand-${expand}`} />

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                History
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
              </Nav>
              {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
