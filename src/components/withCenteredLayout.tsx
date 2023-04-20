// components/withCenteredLayout.tsx
import React from 'react';

const withCenteredLayout = (Component: React.ComponentType<any>) => {
  const WrappedComponent = (props: any) => (
    <div className="min-h-screen bg-friendly-grey flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6">
        <Component {...props} />
      </div>
    </div>
  );

  WrappedComponent.displayName = `withCenteredLayout(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};

export default withCenteredLayout;