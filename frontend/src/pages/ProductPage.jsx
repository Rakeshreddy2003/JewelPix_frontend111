import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { CartContext } from '../context/CartContext';
import Cards from '../components/Cards';
import './styles/productPage.css';
import AddToWishlistButton from '../pages/AddToWishListButton.jsx'; // Note: Consider moving this to components folder for consistency

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(console.error);

        axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
            .then(res => setSimilarProducts(res.data.slice(0, 4)))
            .catch(console.error);
    }, [id]);

    if (!product) return <div style={{ color: "white" }}>Loading...</div>;

    const handleAddToCart = () => {
        const item = { 
            _id: product._id, 
            image: product.image, 
            name: product.title, 
            price: product.price, 
            stockStatus: product.stock, 
            rating: product.rating 
        };
        addToCart(item);
    };

    return (
        <div style={{ backgroundColor: '#542c41', color: 'white', padding: '2rem', minHeight: '100vh' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ flex: '1 1 350px', textAlign: 'center' }}>
                    <img src={product.image} alt={product.title} style={{ width: '100%', maxWidth: '400px', borderRadius: '1rem' }} />
                </div>

                <div style={{ flex: '1 1 400px', borderLeft: '1px solid #8D4F61', paddingLeft: '2rem' }}>
                    <p style={{ fontSize: '1rem', opacity: 0.8 }}>{'Product details'}</p>
                    <h2>{product.title}</h2>
                    <h3 style={{ color: '#FAE154' }}>₹ {product.price.toLocaleString()}</h3>
                    <div className="stock">
                        {!isNaN(product.rating) ? (
                            <div className="rating">
                                <span style={{ color: 'black' }}>{product.rating}</span>
                                <span style={{ color: 'white' }}>★</span>
                            </div>
                        ) : (
                            <div className="rating" style={{ width: 'auto', padding: '10px 12px' }}>
                                <span style={{ color: 'black' }}>{product.rating}</span>
                            </div>
                        )}

                        <span
                            style={{
                                color: product.stock?.trim().toLowerCase() === "in stock" ? '#1FB73B' : 'red',
                                fontWeight: 600
                            }}
                        >
                            {product.stock}
                        </span>
                    </div>

                    <h4 style={{ marginTop: '1rem' }}>Product Description</h4>
                    <p style={{ lineHeight: 1.6 }}>{product.description}</p>

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <button className="add-to-cart-btn h-40 w-60" onClick={handleAddToCart}>Add to cart</button>
                        {/* Make sure to pass the ID, not the entire product object */}
                        <AddToWishlistButton 
                            className="wishtlist-btn" 
                            productId={product._id}
                        />
                    </div>
                </div>
            </div>

            <h3 style={{ marginTop: '4rem', textAlign: 'center' }}>Similar matches for you</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', marginTop: '1rem' }}>
                {similarProducts.map((p) => (
                    <div key={p._id} style={{ position: 'relative' }}>
                        <Cards
                            id={p._id}
                            image={p.image}
                            name={p.title}
                            price={p.price.toLocaleString()}
                            stockStatus={p.stock}
                        />
                        {/* Add wishlist button to similar products too */}
                        <AddToWishlistButton 
                            productId={p._id}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                zIndex: 10,
                                width: '30px',
                                height: '30px'
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;