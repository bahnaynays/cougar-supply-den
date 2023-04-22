import { NextPage } from "next";
import React, { useState } from "react";
import Image from 'next/image';
import { ShoppingCart } from '../interfaces/CartInterface';

import { useOnClickOutside } from 'usehooks-ts';
import axios from 'axios';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useProductsHook = () => {
  const { data, error } = useSWR('/api/carts', fetcher);

  const isLoading = !data && !error;
  const isError = error;

  const updateProduct = async (selectedProduct: ShoppingCart) => {
    try {
      const response = await axios.put(`/api/carts?cart_id=${selectedProduct.cart_id}`, selectedProduct);
      const updatedProduct = response.data;
      mutate('/api/carts');
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error.response.data;
    }
  };

  const createProduct = async (newProduct) => {
    await fetch('/api/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    mutate('/api/carts');
  };

  const deleteProduct = async (cart_id) => {
    await fetch(`/api/carts?cart_id=${cart_id}`, {
      method: 'DELETE',
    });

    mutate('/api/carts');
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


const ShoppingCart: NextPage = () => {
    const { products, isLoading, isError, createProduct, updateProduct, deleteProduct } = useProductsHook();
    const [activeProduct, setActiveProduct] = useState<number | null>(null);
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading products.</p>;
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart.</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {products.map((product) => (
            <div key={product.Product_id} className="bg-white p-0 rounded outline-hover-white shadow-lg hover:shadow-2xl">
            <Image
              src={'https://via.placeholder.com/150'}
              alt={product.Product_id}
              width={300}
              height={200}
              className="rounded-t"
              layout="fixed"
            />
            <h2 className=" mt-2 text-lg font-bold mx-4">{product.Product_id}</h2>
            <p className="text-gray-600 mx-4">Price: ${product.cost}</p>
            <p className="text-gray-600 mx-4">Quantity: {product.quantity}</p>
            <p className="text-gray-600 mx-4 mb-4">Details: xyz</p>
            <div className="flex justify-between mx-4 mb-4">
              <button
                className="bg-cougar-red text-white px-3 py-1 rounded font-semibold hover:bg-cougar-dark-red"
              >
                Remove
              </button >
              <div className="quantity-select bg-cougar-gold font-semibold text-friendly-black3 pl-3 pr-2 py-1 rounded hover:bg-cougar-gold-dark">
                <label htmlFor="quantity" className="mr-2">QTY:</label>
                <select id="quantity" name="quantity" className="quantity-select bg-cougar-gold text-friendly-black3 py-1 rounded hover:bg-white">
                {[...Array(100)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1}</option>
                ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;


