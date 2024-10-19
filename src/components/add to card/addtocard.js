import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Import the shopping cart icon



const AddToCart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    // Load cart from local storage or initialize as an empty array
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Fetch all products from the API
    axios.get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const cartProducts = products.filter(product => cart.includes(product.id));

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(id => id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update local storage
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">My Cart</h2>
      {cartProducts.length > 0 ? (
        <div className="row">
          {cartProducts.map((product) => (
            <div className="col-md-4 mb-3" key={product.id}>
              <div className="card h-100">
                {/* <Link to={`/productdetails/${product.id}`}> */}
                  <img
                    src={product.images[0]} // Display the first image
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                {/* </Link> */}
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price.toFixed(2)}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5">
        <FontAwesomeIcon icon={faShoppingCart} size="6x" className="mb-4" />
        <p className="text-center mt-3">Your cart is empty.</p>
      </div>
      )}
    </div>
  );
};

export default AddToCart;
