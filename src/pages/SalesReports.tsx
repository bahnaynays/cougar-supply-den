import React, { useState, useEffect } from 'react';
import { Product } from '../interfaces/ProductInterface';
import { useOnClickOutside } from 'usehooks-ts';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import MetricChartSales from '@/components/MetricChartSales';


const SalesReports: React.FC = () => {
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

  const { products, isLoading, isError, createProduct, updateProduct, deleteProduct } = useProductsHook();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

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


  const validateProduct = (product: Partial<Product>): boolean => {
    const requiredFields = ["ProductID", "p_name", "Inv_quantity", "prod_type", "date_add", "supp", "cost"];
    for (const field of requiredFields) {
      if (!product[field]) {
        setErrorMessage(`Please fill in the ${field} field.`);
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };


  const falseClick = (product: Product) => {
    setSelectedProduct(product);

  };


  const handleEditClick = (product: Product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };


  const handleAddSaveClick = async () => {
    if (newProduct && validateProduct(newProduct)) {
      await createProduct(newProduct);
      setShowAddModal(false);
      setNewProduct({});
    }
  };

  const handleSaveClick = async () => {
    if (selectedProduct && validateProduct(selectedProduct)) {
      console.log("Selected product before updating:", selectedProduct);
      const updatedProduct = await updateProduct(selectedProduct);
      closeModal();
      setSelectedProduct(updatedProduct);
    }
  };

  const handleDeleteClick = async (ProductID: string, product: Product) => {
    console.log("delete test");
    setSelectedProduct(product);
    deleteProduct(ProductID);
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (showAddModal) {
      setNewProduct((prevState) => ({ ...prevState, [name]: value }));
    } else if (showModal && selectedProduct) {
      setSelectedProduct((prevState) => {
        if (!prevState) return null;
        return { ...prevState, [name]: value };
      });
    }
  };
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);


  return (
    <div className="min-h-screen bg-friendly-grey py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-xl rounded-1xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block font-semibold text-xl text-gray-700">
                <h2 className="leading-relaxed">Sales Report</h2>
                {filteredProducts && <MetricChartSales products={filteredProducts} />}
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      Sales Reports and such will go here.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReports;