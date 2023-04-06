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
        "bg-zinc-800 text-zinc-100": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow h-12 shadow-lg": true, //positioning & styling
      })}
    >
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>

      <button onClick={navigateToHomePage} className="focus:outline-none">
        <div className="font-bold text-md p-2">Cougar Supply Den</div>
      </button>

      <div className="flex-grow"></div>

      <input
        type="text"
        placeholder="Search..."
        className="bg-white text-black px-4 py-1 w-full md:w-auto md:flex-grow-0 rounded"
      />

      <div className="flex-grow"></div>

      <button onClick={handleLogout} className="flex items-center">
        <div className="hidden lg:block text-md mr-2">Logout</div>
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
      </button>
    </nav>
  );
};

export default Navbar;