import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  UsersIcon,
  ClipboardDocumentIcon,
  BanknotesIcon

} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Sales Reports",
    href: "/SalesReports",
    icon: <BanknotesIcon className="w-5 h-5" />,
  },
  {
    label: "Inventory List",
    href: "/InventoryList",
    icon: <ClipboardDocumentIcon className="w-5 h-5" />,
  },
  {
    label: "Company List",
    href: "/CompanyList",
    icon: <ArchiveBoxIcon className="w-5 h-5" />,
  },
  {
    label: "Manage Carts",
    href: "/ManageCarts",
    icon: <ShoppingCartIcon className="w-5 h-5" />,
  },
  {
    label: "Manage Orders",
    href: "/ManageOrders",
    icon: <HomeIcon className="w-5 h-5" />,
  },
  {
    label: "Manage Users",
    href: "/ManageUsers",
    icon: <UsersIcon className="w-5 h-5" />,
  },
];
