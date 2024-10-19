import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Card, Row, Col, Toast } from 'react-bootstrap';

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    images: [],
  });
  const [newImageUrl, setNewImageUrl] = useState('');
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        const productData = response.data;

        const cleanedImages = productData.images ? productData.images.map(url => url.replace(/[\[\]"']/g, '').trim()) : [];

        setProduct({
          title: productData.title,
          description: productData.description,
          category: productData.category.name,
          price: productData.price,
          images: cleanedImages,
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      title: product.title,
      description: product.description,
      category: {
        id: 1,
        name: product.category,
      },
      price: Number(product.price),
    };

    try {
      await axios.put(`https://api.escuelajs.co/api/v1/products/${id}`, updatedProduct);
      setToastMessage('Product updated successfully!');
      setToastVariant('success');
      setShowToast(true);
      setTimeout(() => {
        navigate('/'); // Navigate after a short delay
      }, 2000);
    } catch (error) {
      console.error('Error updating product:', error);
      setToastMessage('Error updating product.');
      setToastVariant('danger');
      setShowToast(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() !== '') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, newImageUrl.trim()],
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="container my-5">
    <h2 className="text-center mb-4">Update Product Information</h2>
    <form onSubmit={handleSubmit}>
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
          name="newImageUrl"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
        />
        <button type="button" className="btn btn-primary mt-2" onClick={handleAddImage}>
          Add Image
        </button>

        <div className="mt-3">
          {product.images.map((image, index) => (
            <div key={index} className="mb-2">
              <img src={image} alt={`Product ${index + 1}`} className="img-thumbnail" style={{ width: '100px' }} />
              <button
                type="button"
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Update Product
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

export default UpdateForm;
