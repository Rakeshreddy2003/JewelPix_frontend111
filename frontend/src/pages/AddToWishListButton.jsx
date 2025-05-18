import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';

const AddToWishlistButton = ({ productId, className, style = {} }) => {
  const { isProductInWishlist, addToWishlist, removeFromWishlist, loading } = useContext(WishlistContext);
  
  // Check if product is in wishlist
  const isInWishlist = isProductInWishlist(productId);

  const handleToggleWishlist = async () => {
    if (!productId) {
      console.error("No productId provided to AddToWishlistButton");
      return;
    }
    
    if (loading) return;
    
    try {
      if (isInWishlist) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (error) {
      console.error("Wishlist action failed:", error);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={loading}
      className={className || ''}
      style={{
        background: isInWishlist ? '#ff6b6b' : 'transparent',
        border: isInWishlist ? 'none' : '1px solid #fff',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#fff',
        ...style
      }}
      title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      {loading ? '...' : isInWishlist ? '❤️' : '🤍'}
    </button>
  );
};

export default AddToWishlistButton;