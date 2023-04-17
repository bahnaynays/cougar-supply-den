import { NextPage } from "next";
import React from "react";

import { GetServerSideProps } from 'next';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

const fakeProducts: Product[] = [
  {
    id: 1,
    name: 'No. 2 Pencils',
    image: 'https://via.placeholder.com/150',
    price: 3.99,
    quantity: 45,
  },
  {
    id: 2,
    name: 'Bic Mechanic Pencils',
    image: 'https://via.placeholder.com/150',
    price: 6.99,
    quantity: 32,
  },
  {
    id: 3,
    name: 'College-Ruled Notebook',
    image: 'https://via.placeholder.com/150',
    price: 2.99,
    quantity: 11,
  },
  {
    id: 4,
    name: 'Northface Backpack',
    image: 'https://via.placeholder.com/150',
    price: 79.99,
    quantity: 4,
  },
  {
    id: 5,
    name: 'Tooth Brush',
    image: 'https://via.placeholder.com/150',
    price: 1.99,
    quantity: 32,
  },
  {
    id: 6,
    name: 'Standard Scantrons',
    image: 'https://via.placeholder.com/150',
    price: 0.99,
    quantity: 442,
  },

  {
    id: 7,
    name: 'Large Umbrella',
    image: 'https://via.placeholder.com/150',
    price: 9.99,
    quantity: 15,
  },
];

const IndexPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-3">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {fakeProducts.map((product) => (
          <div key={product.id} className="bg-white p-0 rounded outline outline-hover-white hover:shadow-xl">
            <img
              className="bg-white rounded-t  h-[200px] w-[300px]"
              src={product.image}
              alt={product.name}
            />
            <h2 className=" mt-2 text-lg font-bold mx-4">{product.name}</h2>
            <p className="text-gray-600 mx-4">Price: ${product.price}</p>
            <p className="text-gray-600 mx-4">Quantity: {product.quantity}</p>
            <p className="text-gray-600 mx-4 mb-4">Details: xyz</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;