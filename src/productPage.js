import React, { useState, useEffect } from 'react';
import './ProductPage.css'; 
import { FaHome, FaUser, FaEnvelope } from 'react-icons/fa';

const ProductPage = () => {
  const [products, setProducts] = useState([]);  // State to hold product data
  const [cart, setCart] = useState([]);  // State to hold items in the cart
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch product data from JSON file
  useEffect(() => {
    fetch('/products.json')  // No need to include 'public' in the path
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);
  

  // Function to handle adding products to the cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} has been added to your cart!`);
  };
  
 

    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="product-page">
      <header>
        <nav className='search-bar' >
          <div className='searh-option'>
          <label htmlFor="search" className='label'>search</label>
          <input className='input' 
            type="text"
            placeholder='search here'
            id='search'
            value={searchQuery}
            onChange={handleSearch} />
          </div>
           <div className='icon'>
              <h3><FaHome /></h3>
              <h3> <FaUser /></h3>
              <h3><FaEnvelope/></h3>
           </div>
        </nav>
      </header>
      <h1>Mobiles</h1>
      <div className="product-list">
      {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>

      <div className="cart">
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <p>{item.name} - ${item.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
