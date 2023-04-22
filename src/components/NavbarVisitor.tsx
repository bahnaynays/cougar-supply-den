import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useOnClickOutside } from "usehooks-ts";

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

const VisitorNavbar = (props: Props) => {
  const router = useRouter();

  const isLoginPage = router.pathname === "/LoginPage";
  const isSignupPage = router.pathname === "/SignupPage";


  if (isLoginPage || isSignupPage) {
    return null;
  }

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
        "w-full fixed  shadow-xl h-16": true, //positioning & styling
        "z-50": true, //z plane
      })}
    >
      <button className="hover:bg-cougar-dark-red2 py-4 px-6" onClick={props.onMenuButtonClick}>
        <Bars3Icon className="h-7 w-7 " />
      </button>

      <button onClick={navigateToHomePage} className=" hover:bg-cougar-dark-red2 py-3.5 px-4">
        <div className="font-bold text-md py-2"></div>
        <div className="text-sm">
          {/* Replace with the 'your-image-url' with the actual image URL */}
          <Image
          className="max-w-[135px] max-h-[36px] -mt-4"
          src="https://i.postimg.cc/4dZLzP3v/cougar-supply-den-full-logo-alpha.png"
          alt=""
          width={135}
          height={36}
        />
        </div>
      </button>

      <div className="text-cougar-yellow font-bold text-xl py-4 px-6">
          VISITOR VIEW
      </div>

      
      {/*

      <Link href="/TerminalPage" className="text-cougar-yellow font-bold text-xl hover:bg-cougar-dark-red2 py-4 px-6">
          ADMINISTRATOR TERMINAL
      </Link>

      */}

  

<div className="relative flex-1">
  <div className="inline-flex items-stretch max-w-[400px] rounded shadow-lg border-1 border-transparent focus-within:border-blue-500">
 
        <div className="pointer-events-none absolute inset-y-0 right-[calc(84%-2.5rem)] flex items-center px-1.5 text-black"></div>
        
        <input
          type="text"
          placeholder="Search Contents"
          className="text-black px-4 py-1.5 max-w-[800px] rounded border-transparent focus:border-blue-500 focus:ring-0 focus:outline-none"
        />
        <button className="absolute inset-y-0 right-0 flex items-center px-3 rounded-r bg-cougar-gold hover:bg-cougar-gold-dark">
          <MagnifyingGlassIcon className="text-friendly-black fontbold h-6 w-6 " />
        </button>
        
      </div>
    </div>

    <div className="mx-2"></div>
      <div className="p-4 flex">
        <div className="flex gap-1">



      <div className="flex flex-col"></div>
        
      <div className="flex-col">
        



      </div>
        </div>
        <div className="flex justify-end">
            <button onClick={handleLogout} className="flex items-center bg-cougar-teal hover:bg-cougar-dark-teal rounded p-1 md:p-2 ml-4 mr-2">
                <Link href="/LoginPage" className="text-white font-bold hidden lg:block text-sm md:text-md mx-2">
                    Log In
                </Link>
            </button>

            <button onClick={handleLogout} className="flex items-center bg-cougar-gold hover:bg-cougar-gold-dark rounded p-1 md:p-2 mx-8">
                <Link href="/SignupPage" className="text-friendly-black font-bold hidden lg:block text-sm md:text-md mx-2">
                    Sign Up
                </Link>
            </button>
        </div>
        </div>
    

    </nav>
  );
};

export default VisitorNavbar;