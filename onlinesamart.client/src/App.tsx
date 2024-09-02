// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail'; 

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
