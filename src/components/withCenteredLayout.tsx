// components/withCenteredLayout.tsx
import React from "react";

const withCenteredLayout = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <div className="min-h-screen bg-friendly-grey flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6">
        <Component {...props} />
      </div>
    </div>
  );
};

export default withCenteredLayout;