import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { defaultNavItems } from "./defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";

// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
};
const Sidebar = ({ open, navItems = defaultNavItems, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  
  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 bg-black transition-opacity duration-300",
          {
            "opacity-50": open,
            "opacity-0 pointer-events-none": !open,
          }
        )}
      ></div>
      <div
        className={classNames({
          "flex flex-col justify-between": true,
          "bg-bright-white text-friendly-black": true,
          "md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed": true,
          "md:h-[calc(100vh_-_64px)] h-full w-[256px] ": true,
          "transition-transform .2s ease-in-out md:-translate-x-0": true,
          "-translate-x-full ": !open,
        })}
        ref={ref}
      >
      <nav className="md:sticky top-0 md:top-16">
        {/* nav items */}
        <ul className="py-2 flex flex-col gap-2">
          {navItems.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    "text-friendly-black hover:bg-hover-white hover:bg-opacity-70 hover:shadow-lg": true, //colors
                    "flex gap-4 items-center ": true, //layout
                    "transition-colors duration-150": true, //animation
                    "rounded-md p-2 mx-2": true, //self style
                  })}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
      {/* account  */}
      <div className="border-t-2 border-t-zinc-800 p-4">
        <div className="flex gap-4 items-center">
          <Image
            src={
              ""
            }
            height={36}
            width={36}
            alt="profile image"
            className="rounded-full"
          />
          <div className="flex flex-col ">
            <span className="text-friendly-black my-0">Dylan Hoang Cao</span>
            <Link href="/UserProfile" className="text-indigo-200 text-sm">
              View Employee Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default Sidebar;
