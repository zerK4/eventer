import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "./ui/button";

export const sidebarMenu = [
  {
    name: "Home",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  {
    name: "Guests",
    icon: <PersonIcon />,
    link: "/dashboard/guests",
  },
  {
    name: "Home",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
];

export function Sidebar() {
  return (
    <div className="w-60 border-r flex flex-col">
      {sidebarMenu.map((item, index) => (
        <Link key={index} href={item.link} className="">
          <Button className="rounded-none w-full bg-transparent text-primary hover:bg-secondary flex justify-start gap-4">
            {item.icon}
            {item.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
