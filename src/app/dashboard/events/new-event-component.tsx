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
import useEventStore from "@/store/useEventStore";
import useGuestStore from "@/store/useGuestStore";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

export default function NewAccount() {
  const { createEvent, event, createAccount } = useEventStore();
  const { user } = useUser();

  const { loading } = useDefaultStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={createAccount} className="" variant={"outline"}>
          Create event
        </Button>
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
                useEventStore.setState((state) => ({
                  event: {
                    ...state.event,
                    name: e.target.value,
                  },
                }))
              }
              id="name"
              value={event?.name}
              className="col-span-3"
              required
            />
          </div>
          <div className="flex justify-between gap-4 items-center w-full">
            <Label htmlFor="type" className="w-20">
              Type
            </Label>
            <Input
              onChange={(e) =>
                useEventStore.setState((state) => ({
                  event: {
                    ...state.event,
                    type: e.target.value,
                  },
                }))
              }
              id="type"
              value={event?.type}
              className="col-span-3"
              placeholder="Wedding, Private party, etc."
              required
            />
          </div>
          <div className="flex justify-between gap-4 items-center w-full">
            <Label htmlFor="code" className="w-20">
              Code
            </Label>
            <Input
              onChange={(e) =>
                useEventStore.setState((state) => ({
                  event: {
                    ...state.event,
                    code: e.target.value,
                  },
                }))
              }
              id="code"
              value={event?.code}
              className="col-span-3"
              placeholder="A code to identify your guests"
              required
            />
          </div>
          <div className="flex justify-between gap-4 items-center w-full">
            <Label htmlFor="location" className="w-20">
              Location
            </Label>
            <Input
              onChange={(e) =>
                useEventStore.setState((state) => ({
                  event: {
                    ...state.event,
                    location: e.target.value,
                  },
                }))
              }
              id="location"
              value={event?.location}
              className="col-span-3"
              required
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={() => {
                createEvent(user?.primaryEmailAddress?.emailAddress as string);
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
