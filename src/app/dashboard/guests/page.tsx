import React from "react";
import GuestMenuBar from "./MenuBar-component";
import GuestTable from "./data-table";
import prisma from "@/lib/prisma";
import useGuestStore, { GuestStore } from "@/store/useGuestStore";
import { columns } from "./columns";
import guestStore from "@/store/useGuestStore";
import setGuests from "@/store/useGuestStore";

const getUsers = async (): Promise<GuestStore["guest"][]> => {
  const data = await prisma.guest.findMany({});

  return data;
};

getUsers();

const newGuest = async (guestData: GuestStore["guest"]) => {
  const data = await prisma.guest.create({
    data: guestData,
  });

  return data;
};

async function Guests() {
  const guests = await getUsers();

  console.log(guestStore, "getting store");

  return (
    <div className="w-full">
      <div className="border-b w-full py-2">
        <GuestMenuBar />
      </div>
      <div className="m-4 mt-0">
        <GuestTable data={guests} />
      </div>
    </div>
  );
}

export default Guests;
