"use client";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
// import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { checkAuthStatus } from "./actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const { user } = useKindeBrowserClient();

  const { data } = useQuery({
    queryKey: ["checkAuthStatus"],
    queryFn: async () => await checkAuthStatus(),
  });

  useEffect(() => {
    const stripePaymentLink = localStorage.getItem("Stripe_Payment_Link");

    if (data?.success && stripePaymentLink && user?.email) {
      localStorage.removeItem("Stripe_Payment_Link"); // remove that link from localstorage, once it's work is done
      router?.push(stripePaymentLink + `?prefilled_email=${user?.email}`);
    } else if (data?.success === false) {
      router?.push("/");
    }
  }, [router, data, user]);

  if (data?.success) router.push("/");

  return (
    <div className="mt-20 w-full flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader className="w-10 h-10 animate-spin text-primary" />
        <h3 className="text-xl font-bold">Redirecting...</h3>
        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default Page;
