import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast'; // Import Bootstrap Toast
import axios from 'axios';
import './details.css'; // Import custom CSS for styling

export default function ProductDetails() {
    const { id } = useParams(); // Get the product ID from route parameters
    const [product, setProduct] = useState(null); // State to store product data
    const [cart, setCart] = useState(() => {
        // Load cart from local storage or initialize as an empty array
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [showToast, setShowToast] = useState(false); // State to control toast visibility
    const [toastMessage, setToastMessage] = useState(''); // State for toast message
    const [toastVariant, setToastVariant] = useState('success'); // State for toast variant

    useEffect(() => {
        // Fetch product details based on the ID
        axios.get(`https://api.escuelajs.co/api/v1/products/${id}`)
            .then((res) => {
                setProduct(res.data); // Store product data in state
            })
            .catch((err) => {
                console.error('Error fetching product details:', err);
            });
    }, [id]); // Re-run the effect when the ID changes

    // Function to add product to cart
    const addToCart = (productId) => {
        setCart((prevCart) => {
            // Check if the product is already in the cart
            if (!prevCart.includes(productId)) {
                const updatedCart = [...prevCart, productId];
                localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
                setShowToast(true); // Show the toast
                setToastMessage('Product added successfully!'); // Set success message
                setToastVariant('success'); // Set variant to success
                return updatedCart;
            }
            return prevCart; // Return previous cart if product is already in cart
        });
    };

    // Function to remove product from cart
    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            // Check if the product is in the cart
            if (prevCart.includes(productId)) {
                const updatedCart = prevCart.filter(id => id !== productId);
                localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
                setShowToast(true); // Show the toast
                setToastMessage('Product removed from cart!'); // Set danger message
                setToastVariant('danger'); // Set variant to danger
                return updatedCart;
            }
            return prevCart; // Return previous cart if product is not in cart
        });
    };

    if (!product) {
        return <h1>Loading...</h1>; // Display a loading message while fetching data
    }

    return (
        <Container className="product-details-container mt-5">
            <Row>
                <Col md={6}>
                    <Card className="card-shadow">
                        <Card.Img 
                          variant="top" 
                          src={product.images[0] || '/path/to/default-image.jpg'} // Fallback image
                          className="product-image" 
                          alt={product.title} 
                        />
                    </Card>
                </Col>
                <Col md={6}>
                    <h2>{product.title}</h2>
                    <p className="text-muted">{product.category.name}</p>
                    <p className="product-description">{product.description}</p>
                    <h4 className="font-weight-bold">Price: ${product.price.toFixed(2)}</h4>
                    <div className="button-group mt-4">
                        <Button onClick={() => addToCart(product.id)} variant="primary" size="lg" className="mr-2">Add to Cart</Button>
                        <Button onClick={() => removeFromCart(product.id)} variant="danger" size="lg">Remove from Cart</Button>
                    </div>
                </Col>
            </Row>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={2000}
                autohide
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1, padding: 0, border: 'none' }} // Remove padding and border from Toast
            >
                <div className={`alert alert-${toastVariant} m-0`} role="alert" style={{ borderRadius: '0.25rem' }}>
                    {toastMessage}
                </div>
            </Toast>
        </Container>
    );
}
