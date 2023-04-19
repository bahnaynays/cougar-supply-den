// components/withCenteredLayout.tsx
import React from 'react';

const withCenteredLayout = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <div className="min-h-screen bg-friendly-grey flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6">
        <div className="bg-white shadow-xl rounded-1xl p-8 sm:p-10">
          <Component {...props} />
        </div>
      </div>
    </div>
  );
};

export default withCenteredLayout;