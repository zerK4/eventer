"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDefaultStore from "@/store/useDefaultStore";
import StepOneCard from "./components/StepOneCard";

function CreateAccount() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [createdNow, setCreateNow] = useState<boolean>();
  const { loading } = useDefaultStore();
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    useDefaultStore.setState({
      loading: true,
    });
    const createUser = async () => {
      if (isLoaded && isSignedIn) {
        try {
          const { data } = await axios({
            method: "POST",
            url: "/api/account/create",
            data: {
              email: user?.primaryEmailAddress?.emailAddress,
              name: user?.fullName,
              phone: "",
              type: "",
            },
          });

          setCreateNow(true);
          console.log(data.data);
        } catch (err: any) {
          console.error(err, "hitting error");

          if (err.response.status === 403) {
            router.replace("/dashboard");
          }
        } finally {
          useDefaultStore.setState({
            loading: false,
          });
        }
      }
    };

    createUser();
  }, [isLoaded, isSignedIn]);

  return (
    <div className="controlled-height flex items-center justify-center">
      {loading ? (
        <div className="loader before:border-2 h-20 w-20 before:border-white" />
      ) : (
        <StepOneCard />
      )}
    </div>
  );
}

export default CreateAccount;
