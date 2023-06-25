import React from "react";
import ThemeToggle from "./Theme-toggle";

function Footer() {
  return (
    <div className="relative border h-20">
      <div className="absolute bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Footer;
