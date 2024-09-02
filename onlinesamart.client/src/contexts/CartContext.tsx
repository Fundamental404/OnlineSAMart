import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Define a type for the props expected by CartProvider
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setItems(prevItems => {
            const foundIndex = prevItems.findIndex(item => item.id === product.id);
            if (foundIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[foundIndex].quantity += 1;
                return updatedItems;
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        setItems(prevItems => {
            return prevItems.map(item => item.id === productId ? { ...item, quantity: quantity } : item);
        });
    };

    const clearCart = () => {
        setItems([]);
    };

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
