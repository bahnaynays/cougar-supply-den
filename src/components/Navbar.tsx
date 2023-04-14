import React from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import { useRouter } from "next/router";
import { useOnClickOutside } from "usehooks-ts";
import { defaultNavItems } from "./defaultNavItems";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";




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
        "w-full fixed z-5 shadow-lg h-16": true, //positioning & styling
      })}
    >
      <button className="hover:bg-cougar-dark-red2 py-4 px-6" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-7 w-7 " />
      </button>

      

      <button onClick={navigateToHomePage} className=" hover:bg-cougar-dark-red2 py-3.5 px-4">
        <div className="font-bold text-md py-2"></div>
        <div className="text-sm">
          {/* Replace with the2 'your-image-url' with the actual image URL */}
          <img className="max-w-[135px] max-h-[36px] -mt-4" src="https://i.postimg.cc/4dZLzP3v/cougar-supply-den-full-logo-alpha.png" alt="" />
        </div>
      </button>

      <Link href="/" className="text-cougar-yellow font-bold text-md hover:bg-cougar-dark-red2 py-5 px-6">
          Store
      </Link>

      <div className="flex-grow"></div>

      <div className="relative ">
        <div className="inline-flex items-stretch max-w-[400px] rounded shadow-md border-1 border-transparent focus-within:border-orange-500">
          <select
            className="text-sm bg-hover-white text-black sm:max-w-[8x] max-w-[128px] px-4 py-2 rounded-l appearance-none focus:outline-none focus:border-orange-500 focus:ring-orange-500 focus:underline-none"
          >
            <option className="text-sm" value="option1">Product</option>
            <option className="text-sm" value="option2">Company</option>
            <option className="text-sm" value="option3">Employee</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-[calc(84%-2.5rem)] flex items-center px-1.5 text-black">

            
          </div>
          <input
            type="text"
            placeholder="Search Contents"
            className="text-black px-4 py-1.5 max-w-[800px] rounded-r focus:border-red-300 focus:ring-red-300 focus:outline-none"
          
          />
          <button className="absolute inset-y-0 right-0 flex items-center px-3 rounded-r bg-cougar-gold hover:bg-cougar-gold-dark">
            <MagnifyingGlassIcon className="text-friendly-black fontbold h-6 w-6 " />
          </button>
        </div>
      </div>

      <div className="flex-grow mx-2"></div>
      
      <div className="border-t-2 border-hover-white p-4 flex">
        <div className="flex gap-1">
          <img
            src={"https://i.postimg.cc/1RLDzMft/Fg-Q063-XUUAADf-Zg.png"}
            height={38}
            width={38}
            alt="profile image"
            className="rounded-full max-w-64 max-h-64"
          />

      <div className="flex flex-col"></div>
 
      <div className="flex-col">
      <div className="flex flex-col">
        <span className="text-friendly-white text-xs font-boldmy-0">Hello, Dylan Cao</span>
        <Link href="/UserProfile" className="text-cougar-yellow text-sm font-bold hover:underline hover:text-blue-500">
          Account & Lists
        </Link>
      </div>
    </div>
        </div>
      </div>

      <button onClick={handleLogout} className="flex items-center bg-cougar-gold hover:bg-cougar-gold-dark rounded p-1.5 mx-8">
        <Link href="/LoginPage" className="text-friendly-black font font-bold hidden lg:block text-md mr-1 mx-2">
            Sign Out
        </Link>

        <ArrowLeftOnRectangleIcon className="h-5 w-5 text-friendly-black mx-1" />
      </button>

    </nav>
  );
};

export default Navbar;