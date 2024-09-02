import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart: React.FC = () => {
    const { items, removeFromCart, updateQuantity } = useCart();

    return (
        <div>
            <h2>Shopping Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                items.map(item => (
                    <div key={item.id}>
                        <img src={item.imageUrl} alt={item.name} style={{ width: "50px" }} />
                        <h4>{item.name}</h4>
                        <p>{item.price}</p>
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        />
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;
