"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/loader";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import useDefaultStore from "@/store/useDefaultStore";
import useGuestStore from "@/store/useGuestStore";
import { toast } from "react-toastify";

export default function NewGuest() {
  const {
    createGuest,
    guest: { email, name, phone, location },
  } = useGuestStore();

  const { loading } = useDefaultStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="">New guest</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add guest</SheetTitle>
          <SheetDescription>
            Add a new guest and when you are ready press on Save changes
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 w-full">
          <div className="flex justify-between gap-4 items-center w-full">
            <Label htmlFor="name" className="w-20">
              Name
            </Label>
            <Input
              onChange={(e) =>
                useGuestStore.setState((state) => ({
                  guest: {
                    ...state.guest,
                    name: e.target.value,
                  },
                }))
              }
              id="name"
              value={name}
              className="col-span-3"
              required
            />
          </div>
          <div className="flex justify-between gap-4 items-center w-full">
            <Label htmlFor="email" className="w-20">
              Email
            </Label>
            <Input
              onChange={(e) =>
                useGuestStore.setState((state) => ({
                  guest: {
                    ...state.guest,
                    email: e.target.value,
                  },
                }))
              }
              id="email"
              value={email}
              className="col-span-3"
              required
            />
          </div>
          <div className="flex justify-between gap-4 items-center w-full">
            <Label htmlFor="phone" className="w-20">
              Phone
            </Label>
            <Input
              onChange={(e) =>
                useGuestStore.setState((state) => ({
                  guest: {
                    ...state.guest,
                    phone: e.target.value,
                  },
                }))
              }
              id="phone"
              value={phone}
              className="col-span-3"
              required
            />
          </div>
          <div className="flex justify-between gap-4 items-center w-full">
            <Label htmlFor="location" className="w-20">
              Location
            </Label>
            <Input
              onChange={(e) =>
                useGuestStore.setState((state) => ({
                  guest: {
                    ...state.guest,
                    location: e.target.value,
                  },
                }))
              }
              id="location"
              value={location}
              className="col-span-3"
              required
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={() => {
                createGuest();
              }}
              className="w-32"
            >
              {loading ? <Loader /> : "Save changes"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
