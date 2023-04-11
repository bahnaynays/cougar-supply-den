import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRouter } from "next/router";

type Props = {
  onMenuButtonClick(): void;
};

const Navbar = (props: Props) => {
  const router = useRouter();

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...");
  };

  const navigateToHomePage = () => {
    router.push("/");
  };

  return (
    <nav
      className={classNames({
        "bg-cougar-dark-red text-zinc-100": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow-2-xl h-16": true, //positioning & styling
      })}
    >
      <button className="" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-7 w-7" />
      </button>
      
      <button onClick={navigateToHomePage} className="focus:outline-2">
        <div className="font-bold text-md p-2"></div>
        <div className="text-sm">
          {/* Replace 'your-image-url' with the actual image URL */}
          <img className="w-540 h-135 scale-50 -mt-4 " src="https://i.postimg.cc/4dZLzP3v/cougar-supply-den-full-logo-alpha.png" alt="" />
        </div>
      </button>

      <div className="flex-grow mx-5"></div>

      <input
        type="text"
        placeholder="Search Anything"
        className="bg-white text-black px-4 py-1.5 w-full rounded shadow-2xl"
      />

      <div className="flex-grow"></div>
      <div className="flex-grow mx-1"></div>
      
      <div className="hidden lg:block text-md mr-2">Store</div>

      <button onClick={handleLogout} className="flex items-center">
        <div className="hidden lg:block text-md mr-2">Logout</div>
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Navbar;