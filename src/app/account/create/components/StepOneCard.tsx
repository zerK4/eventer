"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDefaultStore from "@/store/useDefaultStore";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const selectOptions = [
  {
    name: "Guest",
    value: "guest",
  },
  {
    name: "Provider",
    value: "provider",
  },
  {
    name: "Event Manager",
    value: "eventManager",
  },
  {
    name: "I have an event to take care of",
    value: "personal",
  },
];

function StepOneCard() {
  const { selectedOption, loading } = useDefaultStore();
  const [phone, setPhone] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const createAccount = async () => {
    useDefaultStore.setState({
      loading: true,
    });
    try {
      const { data } = await axios({
        method: "PUT",
        url: "/api/account/create",
        data: {
          phone: phone,
          type: selectedOption,
          email: user?.primaryEmailAddress?.emailAddress,
        },
      });

      toast.success(data.message);

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      useDefaultStore.setState({
        loading: false,
      });
    }
  };

  return (
    <Card className="w-full sm:w-[20rem] mx-2">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Configure your account as per the desired field.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                id="phone"
                placeholder="Your phone number"
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Your scope</Label>
              <Select
                onValueChange={(value) =>
                  useDefaultStore.setState({
                    selectedOption: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                  <SelectContent position="popper">
                    {selectOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer"
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={createAccount} className="w-28">
          {loading ? <div className="loader" /> : "Create"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepOneCard;
