import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';


import withCenteredLayout from "@/components/withCenteredLayout";


const TerminalPage: React.FC = () => {
  return (
    <>
<div className="min-h-screen bg-friendly-grey py-6 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
    <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-xl rounded-1xl sm:px-10 sm:py-15">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-5">
          <div className="block font-semibold text-xl text-gray-700">
            <h2 className="leading-relaxed font-bold">Cougar Supply Den Administrator Terminal</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <ul className="list-disc space-y-2">
                    <li className="flex items-start">
                      <span className="h-15 flex items-center text-sm">
                        text that describes the terminal
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Modify styling here */}
            <div className="flex justify-end mb-4">
              <div
                className="text-friendly-black3 hover:shadow-lg text-sm mt-5 font-bold rounded px-10 py-10 hover:bg-cougar-gold-dark bg-cougar-gold"
              >
                <Link href="/SalesReports">Sales Reports</Link>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <div
                className="text-friendly-black3 hover:shadow-lg text-sm mt-5 font-bold rounded px-10 py-10 hover:bg-cougar-gold-dark bg-cougar-gold"
              >
                <Link href="/StockReports">Stock Reports</Link>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <div
                className="text-friendly-black3 hover:shadow-lg text-sm mt-5 font-bold rounded px-10 py-10 hover:bg-cougar-gold-dark bg-cougar-gold"
              >
                <Link href="/ProductList">Product List</Link>
              </div>
            </div>


            <div className="flex justify-end mb-4">
              <div
                className="text-friendly-black3 hover:shadow-lg text-sm mt-5 font-bold rounded px-10 py-10 hover:bg-cougar-gold-dark bg-cougar-gold"
              >
                <Link href="/CompanyList">Company List</Link>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <div
                className="text-friendly-black3 hover:shadow-lg text-sm mt-5 font-bold rounded px-10 py-10 hover:bg-cougar-gold-dark bg-cougar-gold"
              >
                <Link href="/ManageList">Manage List</Link>
              </div>
            </div>


            <div className="flex justify-end mb-4">
              <div
                className="text-friendly-black3 hover:shadow-lg text-sm mt-5 font-bold rounded px-10 py-10 hover:bg-cougar-gold-dark bg-cougar-gold"
              >
                <Link href="/ManageOrder">Manage Order</Link>
              </div>
            </div>
            

            <div className="flex justify-end mb-4">
              <div
                className="text-friendly-black3 hover:shadow-lg text-sm mt-5 font-bold rounded px-10 py-10 hover:bg-cougar-gold-dark bg-cougar-gold"
              >
                <Link href="/ManageUsers">Manage Users</Link>
              </div>
            </div>


          </div>
        </div>
      </div>
    </>
  );
};


export default withCenteredLayout(TerminalPage);