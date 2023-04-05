import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon} from '@heroicons/react/24/outline';
import classNames from "classnames";

type Props = {
  onMenuButtonClick(): void;
};

const Navbar = (props: Props) => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
  };

  return (
    <nav
      className={classNames({
        "bg-zinc-800 text-zinc-100": true, // colors
        "flex items-center": true, // layout
        "w-full fixed z-10 px-4 shadow h-12 shadow-lg": true, //positioning & styling
      })}
    >
      <div className="font-bold text-md p-2">Cougar Supply Den</div>
      <div className="flex-grow"></div>

      <button onClick={handleLogout} className="hidden md:block">
        <ArrowLeftOnRectangleIcon className="h-6 w-6" />
      </button>

      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;