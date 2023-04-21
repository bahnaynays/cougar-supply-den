import React, { useState, useEffect } from 'react';
import { Users } from '../interfaces/UsersInterface';
import { useOnClickOutside } from 'usehooks-ts';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { v4 as uuidv4 } from 'uuid';


const ManageUsers: React.FC = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const useProductsHook = () => {
    const { data, error } = useSWR('/api/users', fetcher);

    const isLoading = !data && !error;
    const isError = error;

    const updateProduct = async (selectedProduct: Users) => {
      try {
        const response = await axios.put(`/api/users?user_id=${selectedProduct.user_id}`, selectedProduct);
        const updatedProduct = response.data;
        mutate('/api/users');
        return updatedProduct;
      } catch (error) {
        console.error('Error updating product:', error);
        throw error.response.data;
      }
    };

    const createProduct = async (newProduct) => {
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      mutate('/api/users');
    };

    //NOTE: The await fetch for this one is kind of sus, since its selectedProduct.user_id instead of user_id
    const deleteProduct = async (user_id) => {
      await fetch(`/api/users?user_id=${user_id}`, {
        method: 'DELETE',
      });

      mutate('/api/users');
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
  const [selectedProduct, setSelectedProduct] = useState<Users | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Users>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Users[]>(products);

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


  const validateProduct = (product: Partial<Users>): boolean => {

    
    const requiredFields = ["user_id", "f_name", "l_name", "dob", "email", "phone_num", "pw", "userType", "url_link"];
    for (const field of requiredFields) {
      if (!product[field]) {
        setErrorMessage(`Please fill in the ${field} field.`);
        return false;
      }
    }
    setErrorMessage("");
    return true;
  };


  const falseClick = (product: Users) => {
    setSelectedProduct(product);

  };


  const handleEditClick = (product: Users) => {
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

  const handleDeleteClick = async (userId: string) => {
    console.log("delete test");
    //setSelectedProduct(userId);
    deleteProduct(userId);
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
    {isError && <div>Error loading users</div>}
     
  <h1 className="text-2xl font-semibold mb-10"></h1>
    <div className="relative overflow-x-auto shadow-xl rounded">
      <table className="w-full text-sm text-left text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left  text-white bg-cougar-dark-red">
          Manage Users
            <div className="px-4  -py-4 absolute text-sm right-0.5">
            <button
              className="text-white text-sm px-3 py-1 rounded bg-cougar-teal hover:bg-cougar-dark-teal"
              onClick={handleAddClick}
            >
              + Add New User
            </button>
          </div>
          <span className="absolute text-sm right-5">
            ({products?.length ?? 0} {products?.length === 1 ? 'row' : 'rows'})
          </span>
          <div className="mt-1 text-sm font-normal text-white">
            List of Users and their Full Name, Last Name, Date of Birth, Email Adress, Phone Number, Password, userType, and Picture URLs.
          </div>
        </caption>
        
        <thead className="table-auto w-full text-xs uppercase bg-cougar-red text-gray-200">
          <tr>
            <th scope="col" className="px-4 py-2">User ID</th>
            <th scope="col" className="px-4 py-2">First Name</th>
            <th scope="col" className="px-4 py-2">Last Name</th>
            <th scope="col" className="px-4 py-2">Date of Birth</th>
            <th scope="col" className="px-4 py-2">Email Address</th>
            <th scope="col" className="px-4 py-2">Phone Number</th>
            <th scope="col" className="px-4 py-2">Password</th>
            <th scope="col" className="px-4 py-2">User Type</th>
            <th scope="col" className="px-4 py-2">Url Link</th> 

            <th scope="col" className="px-4 py-2">Update</th> 
            <th scope="col" className="px-4 py-2">Delete</th> 

          </tr>
        </thead>
        <tbody>
        {products && products.map((product: Users, index: number) => (
          <tr key={product.user_id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>

              <td className="text-friendly-black px-4 py-2">{product.user_id}</td>
              <td className="text-friendly-black px-4 py-2">{product.f_name}</td>
              <td className="text-friendly-black px-4 py-2">{product.l_name}</td>


              <td className="text-friendly-black px-4 py-2">{formatDate(product.dob)}</td>
              <td className="text-friendly-black px-4 py-2">{product.email}</td>

              <td className="text-friendly-black px-4 py-2">{product.phone_num}</td>
              <td className="text-friendly-black px-4 py-2">{product.pw}</td>
              <td className="text-friendly-black px-4 py-2">{product.userType}</td>
              <td className="text-friendly-black px-4 py-2">{product.url_link}</td>
             
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
                    handleDeleteClick(selectedProduct.user_id);
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
          Add New User
        </div>

        
      </div>
      <div className="mb-3">
        </div>
        
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="User ID">User ID:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="User ID" name="User ID" value={newProduct.user_id || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="First Name">First Name:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="First Name" name="First Name" value={newProduct.f_name || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Last Name">Last Name:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="Last Name" name="Last Name" value={newProduct.l_name || ''} onChange={handleInputChange} />
          </div>

          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Date of Birth">Date of Birth:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="date" id="Date of Birth" name="Date of Birth" value={newProduct.dob?.substring(0, 10)} onChange={handleInputChange}/>
          </div>

          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Inv_quantity">Email:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="Email" name="Email" value={newProduct.email || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Phone Number">Phone Number:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="Phone Number" name="Phone Number" value={newProduct.phone_num || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Password">Password:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="Password" name="Password" value={newProduct.pw || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="User Type">User Type:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="User Type" name="User Type" value={newProduct.userType || ''} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="User Type">Url Link:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="Url Link" name="Url Link" value={newProduct.url_link || ''} onChange={handleInputChange} />
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
          Edit User
          </div>



        </div>
        <div className="mb-3">
        </div>

        <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="User ID">User ID:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="User ID" name="User ID" value={selectedProduct.user_id} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="First Name">First Name:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="First Name" name="First Name" value={selectedProduct.f_name} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Last Name">Last Name:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="Last Name" name="Last Name" value={selectedProduct.l_name} onChange={handleInputChange} />
          </div>

          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Date of Birth">Date of Birth:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="date" id="Date of Birth" name="Date of Birth" value={selectedProduct.dob?.substring(0, 10)} onChange={handleInputChange}/>
          </div>

          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Inv_quantity">Email:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="Email" name="Email" value={selectedProduct.email} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Phone Number">Phone Number:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="Phone Number" name="Phone Number" value={selectedProduct.phone_num} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="Password">Password:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="Password" name="Password" value={selectedProduct.pw} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="User Type">User Type:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="text" id="User Type" name="User Type" value={selectedProduct.userType} onChange={handleInputChange} />
          </div>
          <div className="flex justify-end">
            <label className="mt-4 mx-4" htmlFor="User Type">Url Link:</label>
            <input className="bg-gray-200 border-0 rounded hover:shadow-lg my-2 mx-4" type="number" id="Url Link" name="Url Link" value={selectedProduct.url_link} onChange={handleInputChange} />
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

export default ManageUsers;
