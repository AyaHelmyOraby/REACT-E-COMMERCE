import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import './navbar.css'
const NavBar = () => {
  const [activeLink, setActiveLink] = useState('/'); // State to track the active link

  const handleLinkClick = (path) => {
    setActiveLink(path); // Update active link
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">Evara</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              onClick={() => handleLinkClick('/')} 
              className={`${activeLink === '/' ? 'active' : ''}`} 
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/favouriteproducts" 
              onClick={() => handleLinkClick('/favouriteproducts')} 
              className={`${activeLink === '/favouriteproducts' ? 'active' : ''}`}
            >
              Favourite
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/about" 
              onClick={() => handleLinkClick('/about')} 
              className={`${activeLink === '/about' ? 'active' : ''}`}
            >
              About Us
            </Nav.Link>
           
           
            
          </Nav>
          {/* Add to Cart Icon with Link */}
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to="/AddToCard" 
              className={`d-flex align-items-center fw-bold ${activeLink === '/AddToCard' ? 'active' : ''}`} 
              onClick={() => handleLinkClick('/AddToCard')}
            >
              <AiOutlineShoppingCart style={{ fontSize: '1.5rem', marginRight: '5px' }} />
              <span className="d-none d-lg-inline">Cart</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
