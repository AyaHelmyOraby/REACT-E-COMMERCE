import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap'; // Import Toast
import './create.css'; // Add your CSS for styling (optional)

const ProductCreate = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    images: [],
    categoryId: '',
  });

  const [categories, setCategories] = useState([]);
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success'); // Default variant

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://api.escuelajs.co/api/v1/categories')
      .then((res) => {
        setCategories(res.data);
        if (res.data.length > 0) {
          setProduct((prevProduct) => ({
            ...prevProduct,
            categoryId: res.data[0].id,
          }));
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: imageUrl ? [imageUrl] : [],
    }));
  };

  const createProduct = (e) => {
    e.preventDefault();

    const defaultValues = {
      title: 'New Product',
      price: 10,
      description: 'A description',
      images: ['https://i.imgur.com/1twoaDy.jpeg'],
    };

    const newProduct = {
      title: product.title || defaultValues.title,
      price: product.price ? Number(product.price) : defaultValues.price,
      description: product.description || defaultValues.description,
      categoryId: product.categoryId,
      images: product.images.length > 0 ? product.images : defaultValues.images,
    };

    axios
      .post('https://api.escuelajs.co/api/v1/products', newProduct)
      .then((res) => {
        console.log('Product created:', res.data);
        setToastMessage('Product created successfully!');
        setToastVariant('success');
        setShowToast(true); // Show the toast
        setTimeout(() => {
          navigate('/'); // Redirect to home after a short delay
        }, 2000);
      })
      .catch((error) => {
        console.error('Error creating product:', error.response ? error.response.data : error);
        setToastMessage('Error creating product.');
        setToastVariant('danger');
        setShowToast(true);
      });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Create Product Information</h2>
      <form onSubmit={createProduct}>
        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={product.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>

        {/* Images */}
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Image URL (optional)
          </label>
          <input
            type="text"
            className="form-control"
            id="images"
            name="images"
            onChange={handleImageChange} // Use separate handler for images
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">Category</label>
          <select
            className="form-control"
            id="categoryId"
            name="categoryId"
            value={product.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={!product.title}>
          Create Product
        </button>
      </form>

      {/* Toast Notification */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1 }}
      >
        <div className={`alert alert-${toastVariant} m-0`} role="alert">
          {toastMessage}
        </div>
      </Toast>


      







    </div>
  );
};

export default ProductCreate;
