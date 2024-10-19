import { Card, Container, Row, Col, Carousel, Toast } from 'react-bootstrap'; // Import Toast
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai"; 
import './product.css';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  useEffect(() => {
    loadProducts(); 
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const loadProducts = () => {
    axios.get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteItem = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then(() => {
          loadProducts(); 
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
        });
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        setToastMessage('Removed from favorites');
        setToastVariant('danger'); // Set variant to danger for removal
        setShowToast(true);
        return prevFavorites.filter(id => id !== productId);
      } else {
        setToastMessage('Added to favorites');
        setToastVariant('success'); // Set variant to success for adding
        setShowToast(true);
        return [...prevFavorites, productId];
      }
    });
  };

  const addToCart = (productId) => {
    setCart((prevCart) => {
      if (prevCart.includes(productId)) {
        setToastMessage('Removed from cart');
        setToastVariant('danger'); // Set variant to danger for removal
        setShowToast(true);
        return prevCart.filter(id => id !== productId);
      } else {
        setToastMessage('Added to cart');
        setToastVariant('success'); // Set variant to success for adding
        setShowToast(true);
        return [...prevCart, productId];
      }
    });
  };

  const isFavorite = (productId) => favorites.includes(productId);
  const isInCart = (productId) => cart.includes(productId);

  return (
    <Container>
      {/* Hook and Slogan */}
      <div className="text-center my-4">
        <h2>Your One-Stop Shop for All Your Needs!</h2>
        <p className="lead">Discover amazing products at unbeatable prices.</p>
      </div>

      {/* Carousel for showcasing products */}
      <Carousel className="my-4" interval={1500}>
        {products.slice(0, 10).map((product) => (
          <Carousel.Item key={product.id}>
            <Link to={`/productdetails/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                className="d-block w-100"
                src={product.images[0]}
                alt={product.title}
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
              <Carousel.Caption></Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>

      <h3 className="text-center my-4">Featured Products</h3>
      <Row>
        {products.map((product) => (
          <Col xs={6} sm={4} md={3} lg={3} key={product.id} className="mb-4">
            <Card className="card h-100 shadow-sm text-center position-relative">
              <div
                onClick={() => toggleFavorite(product.id)}
                className="favorite-icon position-absolute"
                style={{ top: '10px', right: '10px', cursor: 'pointer', fontSize: '1.5rem' }}
              >
                {isFavorite(product.id) ? (
                  <AiFillHeart color="red" />
                ) : (
                  <AiOutlineHeart />
                )}
              </div>

              <Link to={`/productdetails/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Body className="p-3">
                  <Card.Img
                    variant="top"
                    src={product.images[0]}
                    alt={product.title}
                    className="mb-2"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="fw-bold">{`EGP ${product.price.toFixed(2)}`}</Card.Text>
                </Card.Body>
              </Link>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-row align-items-center">
                  <Button
                    variant="success"
                    size="sm"
                    as={Link}
                    to={`/updateform/${product.id}`}
                    className="me-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteItem(product.id)}
                    className="me-2"
                  >
                    Delete
                  </Button>
                </div>

                <div
                  onClick={() => addToCart(product.id)}
                  className="d-flex align-items-center me-2"
                  style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                >
                  <AiOutlineShoppingCart
                    color={isInCart(product.id) ? "green" : "black"}
                    style={{ fontSize: '1.5rem', transition: 'color 0.2s' }}
                  />
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Floating Circular Button for Adding New Product */}
      <Button variant="danger" size="lg" as={Link} to={`/createform/`} className="me-2 create-product-btn">+</Button>

      {/* Toast Notification */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1, padding: 0 }} // Remove default padding
      >
        <div className={`alert alert-${toastVariant} m-0`} role="alert"> {/* Remove margin for the alert */}
          {toastMessage}
        </div>
      </Toast>
    </Container>
  );
};

export default ProductGrid;
