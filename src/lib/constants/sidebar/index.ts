import { ArrowLeftRight, LayoutDashboardIcon, Users2 } from "lucide-react";

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
};

export const sidebarItems: SidebarItem[] = [
  {
    icon: LayoutDashboardIcon,
    label: "Summary",
    href: "/summary",
  },
  {
    icon: Users2,
    label: "Customer",
    href: "/customer",
  },
  {
    icon: ArrowLeftRight,
    label: "Transactions",
    href: "/transactions",
  },
];
