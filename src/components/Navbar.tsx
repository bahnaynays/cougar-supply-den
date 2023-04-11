import React from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useRouter } from "next/router";


import Link from "next/link";
import Image from "next/image";
import { defaultNavItems } from "./defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type Props = {
  onMenuButtonClick(): void;
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
  
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

      

      <button onClick={navigateToHomePage} className="mx-4 focus:outline-2">
        <div className="font-bold text-md p-2"></div>
        <div className="text-sm">
          {/* Replace 'your-image-url' with the actual image URL */}
          <img className="max-w-[135px] max-h-[36px] -mt-4" src="https://i.postimg.cc/4dZLzP3v/cougar-supply-den-full-logo-alpha.png" alt="" />
        </div>
      </button>


        <Link href="/" className="text-bright-white text-md flex-grow">
            Store
        </Link>


        
          <div className="relative">
            <select
              className="text-sm bg-hover-white text-black max-w-100 px-4 py-2 rounded-l-lg shadow-2xl border-2 border-transparent hover:border-green-500 appearance-none focus:outline-none"
            >
              <option className="text-sm" value="option1">Product</option>
              <option className="text-sm" value="option2">Company</option>
              <option className="text-sm" value="option3">Employee</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 -mt-0.5 text-black">
              <svg className="fill-current h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M0 6l10 10 10-10H0zm0 0" />
              </svg>
            </div>
          </div>
        
          <div className="flex">
            
          <div className="relative flex max-w-[600px]">
            <input
              type="text"
              placeholder="Search Anything"
              className="bg-white text-black px-4 py-1.5 w-full rounded-r-lg shadow-2xl border-2 border-transparent hover:border-green-500"
            />
            <button className="absolute inset-y-0 right-0 flex items-center px-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

      <div className="flex-grow mx-2"></div>
      
      <div className="border-t-2 border-hover-white p-4 flex">
        <div className="flex gap-1">
          <img
            src={"https://i.postimg.cc/1RLDzMft/Fg-Q063-XUUAADf-Zg.png"}
            height={36}
            width={36}
            alt="profile image"
            className="rounded-full"
          />

      <div className="flex flex-col"></div>
 
      <div className="flex-col">
      <div className="flex flex-col">
        <span className="text-friendly-white text-xs my-0">Hello, Dylan Cao</span>
        <Link href="/UserProfile" className="text-bright-white text-sm font-bold hover:underline hover:text-blue-500">
          View Account
        </Link>
      </div>
    </div>
        </div>
      </div>

      <button onClick={handleLogout} className="flex items-center">
        <div className="hidden lg:block text-md mr-2">Logout</div>
        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
      </button>

    </nav>
  );
};

export default Navbar;