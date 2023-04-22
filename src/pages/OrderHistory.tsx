import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const OrderHistory: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-friendly-grey flex justify-center items-center">
        <div className="py-6 w-full max-w-2xl px-4 sm:px-6">
          <div className="bg-white shadow-xl rounded-1xl p-10">
            <div className="text-xl font-semibold mb-6">Order History</div>
            <div className="divide-y divide-gray-200">
              <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="h-15 flex items-center">
                      Order History Contet Goes Here
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex justify-end mt-6">

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;