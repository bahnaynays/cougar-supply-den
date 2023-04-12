import React from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";



const UserProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-friendly-grey py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-xl rounded-1xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block font-semibold text-xl text-gray-700">
                <h2 className="leading-relaxed">Account Information</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <ul className="list-disc space-y-2">

                <li className="flex items-start text-sm">
                  <span className="h-6 flex items-center sm:h-3 text-friendly-black">
                    Email
                  </span>
                </li>
                <div className="relative flex max-w-[600px]">
                  <input
                    type="text"
                    placeholder="Enter Email..."
                    className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
                  />
                </div>

                <div className="p-1"></div>

                <li className="flex items-start text-sm">
                  <span className="h-6 flex items-center sm:h-3 text-friendly-black">
                    Password
                  </span>
                </li>
                <div className="relative flex max-w-[600px]">
                  <input
                    type="text"
                    placeholder="Enter Password..."
                    className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
                  />
                </div>
                <div className="p-1"></div>

                <li className="flex items-start text-sm">
                  <span className="h-6 flex items-center sm:h-3 text-friendly-black">
                    Date of Birth
                  </span>
                </li>
                <div className="relative flex max-w-[600px]">
                  <input
                    type="text"
                    placeholder="Enter Date of Birth..."
                    className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
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