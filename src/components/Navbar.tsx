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

const Navbar = (props: Props) => {
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
  
    switch (selectedOption) {
      case "option1":
        router.push("/ProductList");
        break;
      case "option2":
        router.push("/SupplierList");
        break;
      case "option5":
        router.push("/ManageCarts");
        break;
      case "option4":
        router.push("/ManageOrders");
        break;
      case "option4":
        router.push("/ManageUsers");
        break;
      default:
        break;
    }
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

      <Link href="/TerminalPage" className="text-cougar-yellow font-bold text-xl hover:bg-cougar-dark-red2 py-4 px-6">
          ADMINISTRATOR TERMINAL
      </Link>

      <div className="flex-grow"></div>

      <div className="relative ">
      <div className="inline-flex items-stretch max-w-[400px] rounded shadow-lg border-1 border-transparent focus-within:border-blue-500">
      <select
          className="text-sm bg-hover-white text-black sm:max-w-[8x] max-w-[128px] px-4 py-2 rounded-l border-transparent appearance-none focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:underline-none"
          onChange={handleSelectChange}
        >
          <option className="text-sm" value="option1">Product List</option>
          <option className="text-sm" value="option2">Supplier List</option>
          <option className="text-sm" value="option3">Manage Users</option>
          <option className="text-sm" value="option4">Manage Carts</option>
          <option className="text-sm" value="option5">Manage Orders</option>

        </select>
        <div className="pointer-events-none absolute inset-y-0 right-[calc(84%-2.5rem)] flex items-center px-1.5 text-black"></div>
        
        <input
          type="text"
          placeholder="Search Contents"
          className="text-black px-4 py-1.5 max-w-[800px] rounded-r border-transparent focus:border-blue-500 focus:ring-0 focus:outline-none"
        />
        <button className="absolute inset-y-0 right-0 flex items-center px-3 rounded-r bg-cougar-gold hover:bg-cougar-gold-dark">
          <MagnifyingGlassIcon className="text-friendly-black fontbold h-6 w-6 " />
        </button>
      </div>
    </div>
    <div className="flex-grow mx-2"></div>
    <div className="mx-2"></div>
        {/*notifications*/}
        <div className="flex-col">
          <div className="flex flex-col">
            <Link href="/" className="text-cougar-yellow font-bold text-md hover:bg-cougar-dark-red2 py-5 px-6">
            Store View
            </Link>
          </div>
        </div>

        {/*notifications*/}
        <div className="flex-col">
          <div className="flex flex-col">
            <Link href="/Notifcations" className="text-cougar-yellow font-bold text-md hover:bg-cougar-dark-red2 py-5 px-6">
            Notifcations
            </Link>
          </div>
        </div>

      


      
      <div className="border-t-2 border-hover-white p-4 flex">
        <div className="flex gap-1">
        <Image
          src="https://i.postimg.cc/1RLDzMft/Fg-Q063-XUUAADf-Zg.png"
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

      <button onClick={handleLogout} className="flex items-center bg-cougar-gold hover:bg-cougar-gold-dark rounded p-1 mx-8">
        <Link href="/LoginPage" className="text-friendly-black font font-bold hidden lg:block text-md mr-1 mx-2">
            Sign Out
        </Link>

        <ArrowLeftOnRectangleIcon className="h-4 w-4 text-friendly-black mx-1 font-semibold" />
      </button>

    </nav>
  );
};

export default Navbar;