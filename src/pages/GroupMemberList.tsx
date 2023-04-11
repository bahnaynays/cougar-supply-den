import React from 'react';

const GroupMemberList: React.FC = () => {
  return (
    
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow-xl rounded-1xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block font-semibold text-xl text-gray-700">
                <h2 className="leading-relaxed">Group 10 Member List</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <ul className="list-disc space-y-2">
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      Member 1: Dylan Hoang Cao
                    </span>
                  </li>

                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      Member 2: Benjamin Shek
                    </span>
                  </li>

                  
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      Member 3: Sai Prashanth Harihar
                    </span>
                  </li>

                  
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      Member 4: An Thien Pham
                    </span>
                  </li>

                  
                  <li className="flex items-start">
                    <span className="h-6 flex items-center sm:h-7">
                      Member 5: Demian Alexei Barriga Contreras
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMemberList;