import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'; 

const ProductFavorites = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Filter favorite products based on the saved favorites
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  // Function to remove a product from favorites
  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter(id => id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update local storage
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">My Favorite Products</h2>
      {favoriteProducts.length > 0 ? (
        <div className="row">
          {favoriteProducts.map((product) => (
            <div className="col-md-4 mb-3" key={product.id}>
              <div className="card h-100">
                <Link to={`/productdetails/${product.id}`}>
                  <img
                    src={product.images[0]} // Display the first image
                    className="card-img-top"
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${product.price}</p>
                  {/* Remove from favorites button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromFavorites(product.id)}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
<div className="text-center mt-5">
      <FontAwesomeIcon icon={faHeartBroken} size="6x" className="mb-4 text-danger" />
      <p className="text-center mt-3">No favorite products found.</p>
    </div>
      )}
    </div>
  );
};

export default ProductFavorites;
