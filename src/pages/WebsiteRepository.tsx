import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';


const WebsiteRepository: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-friendly-grey flex justify-center items-center">
        <div className="py-6 w-full max-w-2xl px-4 sm:px-6">
          <div className="bg-white shadow-xl rounded-1xl p-10">
            <div className="text-xl font-semibold mb-6">Website Repository</div>
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
            <div className="flex justify-end mt-6">
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

export default WebsiteRepository;