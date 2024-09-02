
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const ProductDetail: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        axios.get<Product>(`/products/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
            });
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <img src={product.imageUrl} alt={product.name} style={{ width: "300px" }} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>R{product.price}</p>
        </div>
    );
};

export default ProductDetail;
