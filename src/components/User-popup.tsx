"use client";

import React from "react";
import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

const userPopNav = [
  {
    id: "profile",
    name: "Profile",
    icon: <PersonIcon />,
    link: "/dashboard/profile",
  },
  {
    id: "logout",
    name: <SignOutButton />,
    icon: <ExitIcon />,
    link: "/",
  },
];

function UserPopup() {
  const { user, isLoaded, isSignedIn } = useUser();

  console.log(user);

  if (!isLoaded || !isSignedIn) {
    return <SignInButton />;
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative h-10 w-10">
            <Image
              src={user.imageUrl}
              alt={user.fullName as string}
              fill
              className="rounded-full"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-10">
          <DropdownMenuLabel className="flex items-center gap-6">
            <div className="relative h-6 w-6">
              <Image
                src={user.imageUrl}
                alt={user.fullName as string}
                fill
                className="rounded-full"
              />
            </div>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userPopNav.map((link, i) => (
            <Link key={i} href={link.link as string}>
              {link.id === "logout" && <DropdownMenuSeparator />}
              <DropdownMenuItem className="flex items-center gap-2">
                {link.icon}
                {link.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserPopup;
