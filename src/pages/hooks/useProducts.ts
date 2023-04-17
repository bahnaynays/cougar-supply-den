import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useProducts() {
  const { data, error } = useSWR('/api/products', fetcher);

  const isLoading = !data && !error;
  const isError = error;

  const updateProduct = async (updatedProduct) => {
    await fetch('/api/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });

    mutate('/api/products');
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