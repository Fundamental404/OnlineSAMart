import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get<Product[]>('/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            {products.map(product => (
                <div key={product.id}>
                    <img src={product.imageUrl} alt={product.name} style={{ width: "100px", height: "100px" }} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>R{product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
