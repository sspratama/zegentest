import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Tipe produk
type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    rating: number;
};

// Fungsi untuk mengambil daftar produk
const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
    return response.data.products;
};

const ProductTable = () => {
    const { data, isLoading, error } = useQuery<Product[], Error>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 5;

    // Filter data berdasarkan pencarian
    const filteredData = data?.filter((product) =>
        product.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    // Paginasi data
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Reset halaman ke awal jika pencarian berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Saat data sedang dimuat
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    // Saat terjadi error
    if (error) {
        return (
            <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                <p>Error fetching data: {error.message}</p>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Reload
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Input pencarian */}
            <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                    marginBottom: '10px',
                    padding: '5px',
                    width: '300px',
                    fontSize: '14px',
                }}
            />
            {/* Pembungkus untuk responsivitas tabel */}
            <div style={{ overflowX: 'auto' }}>
                <table
                    style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        marginBottom: '20px',
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Thumbnail</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rating</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((product) => (
                            <tr key={product.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {product.title}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {product.category}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    ${product.price.toFixed(2)}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {product.rating.toFixed(1)}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {product.description.slice(0, 50)}...
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Paginasi */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            padding: '5px 10px',
                            border: '1px solid #ddd',
                            backgroundColor: currentPage === index + 1 ? '#007bff' : '#fff',
                            color: currentPage === index + 1 ? '#fff' : '#000',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
                        onMouseLeave={(e) => {
                            if (currentPage !== index + 1) e.currentTarget.style.backgroundColor = '#fff';
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductTable;
