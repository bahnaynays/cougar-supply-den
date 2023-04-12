import React from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";



const UserProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-xl rounded sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block font-semibold text-xl text-gray-700">
                <h2 className="leading-relaxed">User Profile Information</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                     Username
                    </span>
                  </li>

                  <div className="relative flex max-w-[600px]">
                    <input
                      type="text"
                      placeholder="Username"
                      className="bg-white text-black px-4 outline py-1.5 w-full rounded shadow-2xl border-2 border-transparent hover:border-green-500"
                    />
                  </div>
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                     Password
                    </span>
                  </li>
                  <div className="relative flex max-w-[600px]">
                    <input
                      type="text"
                      placeholder="Password"
                      className="bg-white text-black px-4 outline py-1.5 w-full rounded shadow-2xl border-2 border-transparent hover:border-green-500"
                    />
                  </div>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;