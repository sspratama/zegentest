import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProductTable from './component/ProductTable';
import ProductDetail from './component/ProductDetail';

// Membuat instance QueryClient
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <Router>
                    <Routes>
                        {/* Route untuk halaman utama (daftar produk) */}
                        <Route path="/" element={<ProductTable />} />

                        {/* Route untuk detail produk */}
                        <Route path="/product/:productId" element={<ProductDetail />} />
                    </Routes>
                </Router>
            </div>
            {/* Tambahkan Devtools */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;
