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
    label: "Inventory List",
    href: "/InventoryList",
    icon: <ClipboardDocumentIcon className="w-5 h-5" />,
  },
  {
    label: "Company List",
    href: "/CompanyList",
    icon: <ArchiveBoxIcon className="w-5 h-5" />,
  },
];
