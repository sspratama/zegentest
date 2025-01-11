import React from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Tipe data untuk produk
type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
    rating: number;
};

// Fungsi untuk mengambil data produk berdasarkan ID
const fetchProductById = async (id: string): Promise<Product> => {
    try {
        const response = await axios.get<Product>(`https://dummyjson.com/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch product details.'); // Menambahkan error handling lebih deskriptif
    }
};

const ProductDetail: React.FC = () => {
    const { productId } = useParams<{ productId: string }>(); // Ambil parameter dari URL

    // Menggunakan React Query untuk ambil data produk
    const { data: product, isLoading, error } = useQuery<Product, Error>({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(productId as string), // Memastikan `productId` bukan undefined
        enabled: !!productId, // Query hanya jalan jika productId ada
    });

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <div className="spinner" />
                <p>Loading product details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
                Error fetching product: {error.message}
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>{product?.title}</h2>
            <img
                src={product?.thumbnail}
                alt={product?.title}
                style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '20px' }}
            />
            <p>
                <strong>Category:</strong> {product?.category}
            </p>
            <p>
                <strong>Price:</strong> ${product?.price.toFixed(2)}
            </p>
            <p>
                <strong>Rating:</strong> {product?.rating.toFixed(1)}
            </p>
            <p>
                <strong>Description:</strong> {product?.description}
            </p>
        </div>
    );
};

export default ProductDetail;
