import React from "react";
import Navigation from "./ui/Navigation";
import { SignOutButton } from "@clerk/nextjs";
import UserPopup from "./User-popup";

function Header() {
  return (
    <div className="flex justify-between h-20 items-center px-10 border-b">
      <div className="">Logo</div>
      <Navigation />
      <div className="">
        <UserPopup />
      </div>
    </div>
  );
}

export default Header;
