import React from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/router';

const SignupPage: React.FC = () => {
  const router = useRouter();

  const redirectToHomePage = () => {
    router.push('/');
  };

  const redirectToSignupSuccessPage = () => {
    router.push('/LoginPage');
  };


  return (
    <div className="min-h-screen bg-friendly-grey py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-xl rounded-1xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block font-semibold text-xl text-gray-700">
                <h2 className="leading-relaxed">Sign Up To Cougar Supply Den</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              </div>
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                    First Name
                    </span>
                  </li>

                  <div className="relative flex max-w-[600px]">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
                    />
                  </div>

                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                    Middle Name
                    </span>
                  </li>

                  <div className="relative flex max-w-[600px]">
                    <input
                      type="text"
                      placeholder="Middle Name"
                      className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
                    />
                  </div>

                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                    Last Name
                    </span>
                  </li>

                  <div className="relative flex max-w-[600px]">
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
                    />
                  </div>

                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                     Birthdate
                    </span>
                  </li>
                  <div className="relative flex max-w-[600px]">
                    <input
                      type="Birthdate"
                      placeholder="Birthdate"
                      className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
                    />
                  </div>

                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                    Phone Number
                    </span>
                  </li>

                  <div className="relative flex max-w-[600px]">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
                    />
                  </div>


                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                    Email
                    </span>
                  </li>

                  <div className="relative flex max-w-[600px]">
                    <input
                      type="email"
                      placeholder="Email"
                      className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
                    />
                  </div>


                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                     Password
                    </span>
                  </li>
                  <div className="relative flex max-w-[600px]">
                    <input
                      type="password"
                      placeholder="Password"
                      className="bg-hover-white2 text-black px-4 py-1 w-full rounded-md hover:shadow-lg border-2 focus:outline-none border-transparent focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">

                    <button
                      onClick={redirectToHomePage}
                      className="bg-cougar-gold text-white px-3 py-1 rounded-md font-semibold hover:bg-cougar-gold-dark"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={redirectToSignupSuccessPage}
                      className="bg-cougar-teal text-white px-3 py-1 rounded-md font-semibold hover:bg-cougar-dark-teal"
                    >
                      Sign Up
                    </button>
                </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default SignupPage;