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
  BanknotesIcon,
  ChartBarIcon,
  ChartPieIcon,
  ShoppingBagIcon,
  RectangleGroupIcon

} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";

export const NavItemsStockReports: NavItem[] = [
  {
    label: "Sales Reports",
    href: "/SalesReports",
    icon: <BanknotesIcon className="w-5 h-5" />,
  },
  {
    label: "Stock Reports",
    href: "/StockReports",
    icon: <BanknotesIcon className="w-5 h-5" />,
  },
];
