import { NextPage } from "next";

import React, { useEffect, useState } from "react";

import Image from 'next/image';
import { useOnClickOutside } from 'usehooks-ts';

import axios from 'axios';
import useSWR, { mutate } from 'swr';

import { ShoppingCart } from '../interfaces/CartInterface';
import { Product } from '../interfaces/ProductInterface';

import { useAuth } from "../context/AuthContext";
import router from "next/router";


const fetcher = (url: string) => fetch(url).then((res) => res.json());

const IndexPage: NextPage = () => {
  const auth = useAuth(); 

  const useProductsHookProducts = () => {
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

  const useProductsHookCarts = () => {
    const { data, error } = useSWR('/api/carts', fetcher);

    const isLoading2 = !data && !error;
    const isError2 = error;

    const updateCart = async (selectedCart: ShoppingCart) => {
      try {
        const response = await axios.put(`/api/carts?cart_id=${selectedCart.cart_id}`, selectedCart);
        const updatedCart = response.data;
        mutate('/api/carts');
        return updatedCart;
      } catch (error) {
        console.error('Error updating cart:', error);
        throw error.response.data;
      }
    };

    const createCart = async (newCart) => {
      await fetch('/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCart),
      });

      mutate('/api/carts');
    };

    const deleteCart = async (cart_id) => {
      await fetch(`/api/carts?cart_id=${cart_id}`, {
        method: 'DELETE',
      });

      mutate('/api/carts');
    };

    return {
      carts: data,
      isLoading2,
      isError2,
      updateCart,
      createCart,
      deleteCart,
    };
  };


  const { products, isLoading, isError, createProduct, updateProduct, deleteProduct } = useProductsHookProducts();
  const { carts, isLoading2, isError2, updateCart, createCart, deleteCart } = useProductsHookCarts();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCart, setSelectedCart] = useState<Product | null>(null);

  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [activeCart, setActiveCart] = useState<number | null>(null);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [newCart, setNewCart] = useState<Partial<ShoppingCart>>({});

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filteredCarts, setFilteredCarts] = useState<ShoppingCart[]>(carts);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;

  if (isLoading2) return <p>Loading...</p>;
  if (isError2) return <p>Error loading carts.</p>;


  const formatDate = (dateString: string): string => {
    if (!dateString) {
      return 'Unspecified Date'; 
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };




  const falseClickProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleEditClickProduct = (product: Product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };


  //creater  of product
  const handleAddSaveClickProduct = async () => {
    if (newProduct) {
      await createProduct(newProduct);
      setShowAddModal(false);
      setNewProduct({});
    }
  };

  const handleSaveClickProduct= async () => {
    if (selectedProduct) {

      const updatedProduct = await updateProduct(selectedProduct);
      closeModalProduct();
      setSelectedProduct(updatedProduct);
    }
  };

  const handleDeleteClickProduct = async (ProductID: string, product: Product) => {
    setSelectedProduct(product);
    deleteProduct(ProductID);
  };

  const handleAddClickProduct = () => {
    setShowAddModal(true);
  };

  const closeModalProduct = () => {
    setShowModal(false);
  };
  /*
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  */
  
  /*
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  */

  const falseClickCart = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleEditClickCart = (product: Product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const handleAddSaveClick = async () => {
    if (newProduct) {
      await createProduct(newProduct);
      setShowAddModal(false);
      setNewProduct({});
    }
  };

  const handleSaveClickCart = async () => {
    if (selectedProduct) {
      const updatedProduct = await updateProduct(selectedProduct);
      closeModalCart();
      setSelectedProduct(updatedProduct);
    }
  };

  const handleDeleteClickCart = async (ProductID: string, product: Product) => {
    setSelectedProduct(product);
    deleteProduct(ProductID);
  };

  const handleAddClickCart = () => {
    setShowAddModal(true);
  };

  const closeModalCart = () => {
    setShowModal(false);
  };

  /*
  useEffect(() => {
    setFilteredCarts(carts);
  }, [carts]);
  */
  
  /*
  useEffect(() => {
    setFilteredCarts(carts);
  }, [carts]);
  */


  const redirectToCart = () => {
    if (auth.user === carts) {

    }
    router.push('/ShoppingCart');
  };


  const redirectToCheckout = () => {
    router.push('/CheckoutPage');
  };

  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Products.</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {products.map((product) => (
          <div key={product.ProductID} className="bg-white p-0 rounded outline-hover-white shadow-lg hover:shadow-2xl">
            <Image
              src={`${product.url_link}`}
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
                onClick={redirectToCart}
              >
                Add to Cart
              </button>
              <button
                className="bg-cougar-red text-white px-3 py-1 rounded font-semibold hover:bg-cougar-dark-red"
                onClick={redirectToCheckout}
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