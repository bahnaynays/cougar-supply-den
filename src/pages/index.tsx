import { NextPage } from "next";
import React, { useState } from "react";
import Image from 'next/image';
import { Product } from '../interfaces/ProductInterface';


import { useOnClickOutside } from 'usehooks-ts';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());


const useProductsHook = () => {
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
};


const IndexPage: NextPage = () => {
  const { products, isLoading, isError, createProduct, updateProduct, deleteProduct } = useProductsHook();
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {products.map((product) => (
          <div key={product.ProductID} className="bg-white p-0 rounded outline-hover-white shadow-lg hover:shadow-2xl">
            <Image
              src={'https://via.placeholder.com/150'}
              alt={product.p_name}
              width={300}
              height={200}
              className="rounded-t"
              layout="fixed"
            />
            <h2 className=" mt-2 text-lg font-bold mx-4">{product.p_name}</h2>
            <p className="text-gray-600 mx-4">Price: ${product.cost}</p>
            <p className="text-gray-600 mx-4">Quantity: {product.Inv_quantity}</p>
            <p className="text-gray-600 mx-4 mb-4">Details: xyz</p>
            <div className="flex justify-between mx-4 mb-4">
            <button
                className="bg-cougar-gold text-friendly-black3 px-3 py-1 rounded font-semibold hover:bg-cougar-gold-dark"
              >
                Add to Cart
              </button>
              <button
                className="bg-cougar-red text-white px-3 py-1 rounded font-semibold hover:bg-cougar-dark-red"
              >
                Buy Now
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;