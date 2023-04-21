import React, { useState, useEffect } from 'react';
import useProducts from './hooks/useProducts';
import { Product } from '../interfaces/ProductInterface';
import { useOnClickOutside } from 'usehooks-ts';

const ProductList: React.FC = () => {


  const { products, isLoading, isError, createProduct, updateProduct, deleteProduct } = useProducts();

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
  <div className="container mx-auto px-4 mb-4">
    {isLoading && <div>Loading...</div>}
    {isError && <div>Error loading products</div>}
     
  <h1 className="text-2xl font-semibold mb-10"></h1>
    <div className="relative overflow-x-auto shadow-xl rounded">
      <table className="w-full text-sm text-left text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left  text-white bg-cougar-dark-red">
          Product List
            <div className="px-4  -py-4 absolute text-sm right-0.5">
            <button
              className="text-white text-sm px-3 py-1 rounded bg-cougar-teal hover:bg-cougar-dark-teal"
              onClick={handleAddClick}
            >
              + Add New Product
            </button>
          </div>
          <span className="absolute text-sm right-5">
            ({products?.length ?? 0} {products?.length === 1 ? 'row' : 'rows'})
          </span>
          <div className="mt-1 text-sm font-normal text-white">
            List of Products with their IDs Names, Types, Quantities, Date Added, Supplier, and their specific Cost.
          </div>
        </caption>
        
        <thead className="table-auto w-full text-xs uppercase bg-cougar-red text-gray-200">
          <tr>
            <th scope="col" className="px-4 py-2">Product ID</th>
            <th scope="col" className="px-4 py-2">Name</th>

            <th scope="col" className="px-4 py-2">Type</th>
            <th scope="col" className="px-4 py-2">Quantity</th>

            <th scope="col" className="px-4 py-2">Date Added</th>

            <th scope="col" className="px-4 py-2">Supplier</th>
            <th scope="col" className="px-4 py-2">Cost</th>
            <th scope="col" className="px-4 py-2">Update</th> 
            <th scope="col" className="px-4 py-2">Delete</th> 
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.map((product: Product, index: number) => (
            <tr key={product.ProductID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>

              <td className="text-friendly-black px-4 py-2">{product.ProductID}</td>
              <td className="text-friendly-black px-4 py-2">{product.p_name}</td>
              <td className="text-friendly-black px-4 py-2">{product.prod_type}</td>
              <td className="text-friendly-black px-4 py-2">{product.Inv_quantity}</td>


              <td className="text-friendly-black px-4 py-2">{formatDate(product.date_add)}</td>

              <td className="text-friendly-black px-4 py-2">{product.supp}</td>
              <td className="text-friendly-black px-4 py-2">{product.cost}</td>
             
              <td className="px-4 py-2">
                <button
                  className="bg-cougar-gold text-friendly-black px-3 font-semibold py-1 rounded hover:bg-cougar-gold-dark"
                  onClick={() => handleEditClick(product)}
                >
                  Update
                </button>
              </td>

              <td className="px-4 py-2">
                <button
                  className="bg-cougar-red text-white px-3 py-1 rounded font-semibold hover:bg-cougar-dark-red"
                  onClick={() => {
                    
                  if (selectedProduct) {
                    handleDeleteClick(selectedProduct.ProductID, product);
                  }
                }}
              >
                Delete
            </button>
            </td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
    
  {showAddModal && (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50"
      onClick={() => setShowAddModal(false)}
    >
      <div
        className="bg-white p-4 rounded my-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className='rounded-b'>
        <div className="flex items-center justify-between bg-friendly-black3 rounded-t p-2">
        <div className="px-4 text-lg font-semibold text-left text-white rounded">
          Add New Product
        </div>

        
      </div>
      <div className="mb-3">
        </div>
        
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="ProductID">Product ID:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="ProductID" name="ProductID" value={newProduct.ProductID || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="p_name">Name:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="p_name" name="p_name" value={newProduct.p_name || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="prod_type">Type:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="prod_type" name="prod_type" value={newProduct.prod_type || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Inv_quantity">Quantity:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="Inv_quantity" name="Inv_quantity" value={newProduct.Inv_quantity || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="date_add">Date Added:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="date" id="date_add" name="date_add" value={newProduct.date_add?.substring(0, 10)} onChange={handleInputChange}/>
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="supp">Supplier:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="supp" name="supp" value={newProduct.supp || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="cost">Cost:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="cost" name="cost" value={newProduct.cost || ''} onChange={handleInputChange} step="0.01" />
          </div>
          
        <div className='py-3'></div>
      </div>
        {errorMessage && (
          <div
            className={`bg-cougar-gold text-white px-4 z-0 py-2 rounded font-semibold mb-4 ${errorMessage ? 'flashy-error' : ''}`}
            style={{ zIndex: 1000 }}
          >
        {errorMessage}
        </div>
        )}
      <div className="flex justify-between">
        

        <div className="text-right">
          <button className="rounded hover:bg-cougar-dark-red font-semibold px-4 py-1 mt-3 text-white marker:font-semi-bold bg-cougar-red" onClick={() => setShowAddModal(false)}
          >
            Cancel
          </button>
        </div>
        
        <div className="text-right">
          <button
            className="rounded bg-cougar-teal px-4 py-1 text-white font-semibold mt-3 hover:bg-cougar-dark-teal"
            onClick={handleAddSaveClick}
          >
            Create
          </button>
        </div>

        


      </div>
      </div>
    </div>
  )}

  {showModal && selectedProduct && (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50"
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



        </div>
        <div className="mb-3">
        </div>

        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="ProductID">Product ID:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="ProductID" name="ProductID" defaultValue={selectedProduct.ProductID} onChange={handleInputChange} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="p_name">Name:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="p_name" name="p_name" defaultValue={selectedProduct.p_name} onChange={handleInputChange} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="Inv_quantity">Quantity:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="Inv_quantity" name="Inv_quantity" defaultValue={selectedProduct.Inv_quantity} onChange={handleInputChange} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="prod_type">Type:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="prod_type" name="prod_type" defaultValue={selectedProduct.prod_type} onChange={handleInputChange} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="date_add">Date Added:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="date" id="date_add" name="date_add" defaultValue={selectedProduct.date_add?.substring(0, 10)} onChange={handleInputChange} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="supp">Supplier:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="supp" name="supp" defaultValue={selectedProduct.supp || ''} onChange={handleInputChange} />
        </div>
        <div className="flex justify-end">
          <label className="mt-4 mx-4" htmlFor="cost">Cost:</label>
          <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="cost" name="cost" defaultValue={selectedProduct.cost || ''} step="0.01" onChange={handleInputChange} />
        </div>
        
        <div className='py-3'></div>
      </div>
      <div className="flex justify-between">
        

      <div className="text-right">
          <button className="rounded hover:bg-cougar-dark-red font-semibold px-4 py-1 mt-3 text-white marker:font-semi-bold bg-cougar-red" onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        
        <div className="text-right">
          
          <button
            className="rounded bg-cougar-gold px-4 py-1 text-friendly-black3 font-semibold mt-3 hover:bg-cougar-gold-dark"
            onClick={handleSaveClick}
          >
            Update
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
