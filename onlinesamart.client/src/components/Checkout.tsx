
import React from 'react';
import { useCart } from '../contexts/CartContext';

const Checkout: React.FC = () => {
    const { items, clearCart } = useCart();

    const handleCheckout = () => {
        // Remember to intergrate payment gateway
        console.log('Processing checkout...');
        clearCart();
        alert('Checkout complete!');
    };

    return (
        <div>
            <h2>Checkout</h2>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name} - {item.quantity} x {item.price}</li>
                ))}
            </ul>
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default Checkout;
