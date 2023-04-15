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

const ProductList = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEditClick = (product: Product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDeleteClick = async (productId: string) => {
    try {
      const response = await fetch(`/api/products?productId=${productId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setProducts(products.filter((product) => product.ProductID !== productId));
      } else {
        console.error('Failed to delete product:', productId);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSaveClick = async () => {
    if (!selectedProduct) return;
  
    const updatedProduct: Product = {
      ProductID: selectedProduct.ProductID,
      p_name: (document.getElementById("p_name") as HTMLInputElement).value,
      Inv_quantity: Number((document.getElementById("Inv_quantity") as HTMLInputElement).value),
      prod_type: (document.getElementById("prod_type") as HTMLInputElement).value,
      p_thresh: Number((document.getElementById("p_thresh") as HTMLInputElement).value),
      date_add: (document.getElementById("date_add") as HTMLInputElement).value,
      cart_id: Number((document.getElementById("cart_id") as HTMLInputElement).value) || null,
      supp: (document.getElementById("supp") as HTMLInputElement).value || null,
      cost: Number((document.getElementById("cost") as HTMLInputElement).value) || null,
    };
  
    try {
      const response = await fetch(`/api/products`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
  
      if (response.ok) {
        setProducts(products.map((product) => product.ProductID === updatedProduct.ProductID ? updatedProduct : product));
        closeModal(); // This line closes the modal after updating the product
      } else {
        console.error('Failed to update product:', updatedProduct);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  

return (
  <div className="container mx-auto px-4 mb-4">
      <h1 className="text-2xl font-semibold mb-10"></h1>

      <div className="relative overflow-x-auto shadow-xl rounded">
        <table className="w-full text-sm text-left text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left  text-white bg-cougar-dark-red">
          Product List
            <td className="px-4  -py-4 absolute text-sm right-0.5">
              <button className=" text-white text-sm px-3 py-1 rounded bg-cougar-teal hover:bg-cougar-dark-teal ">
                      + Add New Product
              </button>
          </td>
          <span className="absolute text-sm right-5">
              ({products.length} {products.length === 1 ? 'row' : 'rows'})
            </span>
        
        <p className="mt-1 text-sm font-normal text-white">List of Products with their IDs Names, Quantities, Types, Thresholds, Data Added, Cart ID, Supplier, and Cost.</p>

       
        </caption>
        
        <thead className="table-auto w-full text-xs uppercase bg-cougar-red text-gray-200">
            <tr>
                <th scope="col" className="px-4 py-2">Product ID</th>
                <th scope="col" className="px-4 py-2">Name</th>
                <th scope="col" className="px-4 py-2">Quantity</th>
                <th scope="col" className="px-4 py-2">Type</th>
                <th scope="col" className="px-4 py-2">Threshold</th>
                <th scope="col" className="px-4 py-2">Date Added</th>
                <th scope="col" className="px-4 py-2">Cart ID</th>
                <th scope="col" className="px-4 py-2">Supplier</th>
                <th scope="col" className="px-4 py-2">Cost</th>
                
                <td className="px-4 py-2 w-20">
                  <button className=" text-white px-3 py-1 rounded hover:bg-cougar-dark-red">
                    Edit
                  </button>
                </td>
                
            </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
              <tr key={product.ProductID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>

              <td className="text-friendly-black px-4 py-2">{product.ProductID}</td>
              <td className="text-friendly-black px-4 py-2">{product.p_name}</td>
              <td className="text-friendly-black px-4 py-2">{product.Inv_quantity}</td>
              <td className="text-friendly-black px-4 py-2">{product.prod_type}</td>
              <td className="text-friendly-black px-4 py-2">{product.p_thresh}</td>
              <td className="text-friendly-black px-4 py-2">{product.date_add}</td>
              <td className="text-friendly-black px-4 py-2">{product.cart_id}</td>
              <td className="text-friendly-black px-4 py-2">{product.supp}</td>
              <td className="text-friendly-black px-4 py-2">{product.cost}</td>

              <td className="px-4 py-2">
              <button
                className="bg-cougar-gold text-friendly-black px-3 py-1 rounded hover:bg-cougar-gold-dark"
                onClick={() => handleEditClick(product)}
              >
                Edit
              </button>
            </td>
            </tr>
          ))}
          </tbody>
    </table>
    
    </div>
    {showModal && selectedProduct && (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-4 rounded my-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className='rounded-b'>
        <div className="flex items-center justify-between bg-friendly-black3 rounded-t p-2">
          <div className="px-4 text-lg font-semibold text-left text-white rounded">
          Edit Product
          </div>

          <div className="text-right">
          <button className="rounded bg-cougar-gold-dark shadow-2xl px-3 py-1 text-friendly-black font-bold text-xs hover:bg-cougar-gold" onClick={closeModal}>
            Close
          </button>
        </div>
          
        </div>
        <div className="mb-3">
        </div>

        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="ProductID">Product ID:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="ProductID" name="ProductID" defaultValue={selectedProduct.ProductID} readOnly />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="p_name">Name:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="p_name" name="p_name" defaultValue={selectedProduct.p_name} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="Inv_quantity">Quantity:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="Inv_quantity" name="Inv_quantity" defaultValue={selectedProduct.Inv_quantity} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="prod_type">Type:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="prod_type" name="prod_type" defaultValue={selectedProduct.prod_type} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="p_thresh">Threshold:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="p_thresh" name="p_thresh" defaultValue={selectedProduct.p_thresh} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="date_add">Date Added:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="date" id="date_add" name="date_add" defaultValue={selectedProduct.date_add?.substring(0, 10)} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="cart_id">Cart ID:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="cart_id" name="cart_id" defaultValue={selectedProduct.cart_id || ''} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="supp">Supplier:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="supp" name="supp" defaultValue={selectedProduct.supp || ''} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="cost">Cost:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="cost" name="cost" defaultValue={selectedProduct.cost || ''} step="0.01" />
        </div>
        
        <div className='py-3'></div>
      </div>
      <div className="flex justify-between">
        <div className="text-left">
          <button
            className="rounded bg-cougar-red px-4 py-1 text-white font-semibold mt-5 hover:bg-cougar-dark-red"
            onClick={() => {
              if (selectedProduct) {
                handleDeleteClick(selectedProduct.ProductID);
                closeModal();
              }
            }}
          >
            Delete
        </button>
        </div>

        <div className="text-right">
          <button
            className="rounded bg-cougar-teal px-4 py-1 text-white font-semibold mt-5 hover:bg-cougar-dark-teal"
            onClick={() => {
              handleSaveClick();
              closeModal();
            }}
          >
            Save
        </button>
        </div>


      </div>


      </div>
    </div>
  )}
</div>
);
};

export default ProductList;
