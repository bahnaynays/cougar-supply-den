import React, { PropsWithChildren, useState } from "react";
import Navbar from "./AdminNavbar";
import Sidebar from "./Sidebar";


interface LayoutProps {
  useLayout: boolean;
}


const Layout = (props: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header bg-friendly-grey ">
      <div>
        <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} open={false} setOpen={function (open: boolean): void {
          throw new Error("Function not implemented.");
        } } />
      </div>

      <div className="grid md:grid-cols-sidebar">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} toggleMinimized={function (): void {
          throw new Error("Function not implemented.");
        } } />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;


