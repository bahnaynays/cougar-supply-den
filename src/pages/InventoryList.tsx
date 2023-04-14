import { useState, useEffect } from 'react';


interface Product {
  ProductID: string;
  p_name: string;
  Inv_quantity: number;
  prod_type: string;
  p_thresh: number;
  date_add: string | null;
  cart_id: number | null;
  supp: string | null;
  cost: number | null;
}

const InventoryList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data); // Add this line
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Invalid data format received:', data);
        }
      });
  }, []);

  return (

    
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">Inventory List</h1>
      <table className="table-auto w-full border-collapse border-2 border-gray-500">
        <thead>
          <tr>
            <th className="px-4 py-2 border-2 border-gray-500">Product ID</th>
            <th className="px-4 py-2 border-2 border-gray-500">Name</th>
            <th className="px-4 py-2 border-2 border-gray-500">Quantity</th>
            <th className="px-4 py-2 border-2 border-gray-500">Type</th>
            <th className="px-4 py-2 border-2 border-gray-500">Threshold</th>
            <th className="px-4 py-2 border-2 border-gray-500">Date Added</th>
            <th className="px-4 py-2 border-2 border-gray-500">Cart ID</th>
            <th className="px-4 py-2 border-2 border-gray-500">Supplier</th>
            <th className="px-4 py-2 border-2 border-gray-500">Cost</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.ProductID} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border-2 border-gray-500 px-4 py-2">{product.ProductID}</td>
              <td className="border-2 border-gray-500 px-4 py-2">{product.p_name}</td>
              <td className="border-2 border-gray-500 px-4 py-2">{product.Inv_quantity}</td>
              <td className="border-2 border-gray-500 px-4 py-2">{product.prod_type}</td>
              <td className="border-2 border-gray-500 px-4 py-2">{product.p_thresh}</td>
              <td className="border-2 border-gray-500 px-4 py-2">{product.date_add}</td>
              <td className="border-2 border-gray-500 px-4 py-2">{product.cart_id}</td>
              <td className="border-2 border-gray-500 px-4 py-2">{product.supp}</td>
              <td className="border-2 border-gray-500 px-4 py-2">{product.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;