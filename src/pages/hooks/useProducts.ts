/*

import useSWR, { mutate } from 'swr';
import { Product } from '@/interfaces/ProductInterface';
import axios from 'axios';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useProducts() {
  const { data, error } = useSWR('/api/products', fetcher);

  const isLoading = !data && !error;
  const isError = error;

  const updateProduct = async (selectedProduct: Product) => {
    try {
      const response = await axios.put(`/api/products?ProductID=${selectedProduct.ProductID}`, selectedProduct);
      const updatedProduct = response.data;
      mutate('/api/products');
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error.response.data;
    }
  };

  const createProduct = async (newProduct) => {
    await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
  
    mutate('/api/products');
  };
  
  const deleteProduct = async (productId) => {
    await fetch(`/api/products?productId=${productId}`, {
      method: 'DELETE',
    });

    mutate('/api/products');
  };

  return {
    products: data,
    isLoading,
    isError,
    updateProduct,
    deleteProduct,
    createProduct,
  };
}
*/