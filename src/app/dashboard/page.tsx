import { Button } from "@/components/ui/button";
import React from "react";
import NewAccount from "./events/new-event-component";

function Dashboard() {
  return (
    <div className="controlled-height flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <p className="text-neutral-600">Pretty empty here...</p>
        <NewAccount />
      </div>
    </div>
  );
}

export default Dashboard;
