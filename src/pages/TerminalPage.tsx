import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';


import withCenteredLayout from "@/components/withCenteredLayout";


const TerminalPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-friendly-grey py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-xl rounded-1xl sm:px-10 sm:py-15">
            <div className="max-w-md mx-auto">
              <div className="flex items-center space-x-5">
                <div className="block font-semibold text-xl text-gray-700">
                  <h2 className="leading-relaxed">Website Repository</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <ul className="list-disc space-y-2">
                    <li className="flex items-start">
                      <span className="h-15 flex items-center">
                        Currently the repository for this project is private due
                        to confidential database information regarding student
                        creditentials. This section will be public during
                        presentations for educational purposes.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Modify styling here */}
            <div className="flex justify-end mb-4">
              <a
                href="https://github.com/caoboyeehaw/my-chatgpt-app2-main"
                className="text-bright-white hover:shadow-lg text-sm mt-5 font-bold rounded-lg p-2 hover:bg-blue-500 bg-friendly-black3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Product List
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default withCenteredLayout(TerminalPage);