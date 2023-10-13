"use client";

import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { Icons } from "../icons";
import { lemonDets } from "@/config/lemons";
import { getSession } from "next-auth/react";

export default function PricingComponent() {
  const [loading, setLoading] = useState(0);
  const session = getSession();

  const handleCreatePaymentSession = async (productId: string) => {
    const ressx = await session;
    if (ressx?.user.isActive) {
      toast({
        title: "You are already subscribed",
      });
      return;
    }
    const res = await fetch(`/api/payments/subscribe`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      const checkoutURL = (await res.json()).checkoutURL;
      window.location.href = checkoutURL;
    } else {
      toast({
        title: "Error occured while processing payment",
      });
    }
  };
  return (
    <section className="w-full py-12 bg-gradient-to-r flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col p-6 bg-white dark:bg-black text-black dark:text-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300">
            <div>
              <h3 className="text-2xl font-bold text-center">Weekly Pass</h3>
              <div className="mt-4 text-center ">
                <span className="text-4xl font-bold">$9</span>/ week
              </div>
              <ul className="mt-4 space-y-2 ">
                <li className="flex items-center ">
                  <svg
                    className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  720p Video Rendering
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Add Background Music
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button
                className="w-full"
                disabled={loading === 1}
                onClick={async () => {
                  setLoading(1);
                  await handleCreatePaymentSession(
                    lemonDets[
                      process.env.NODE_ENV === "development" ? "test" : "live"
                    ].weeklyProductId
                  );
                  setLoading(0);
                }}
              >
                {loading === 1 && (
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                )}
                Buy Now
              </Button>
            </div>
          </div>
          <div className="relative flex flex-col p-6 bg-white dark:bg-black text-black dark:text-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500 ">
            <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Most Bought
            </div>
            <div>
              <h3 className="text-2xl font-bold text-center">Pro</h3>
              <div className="mt-4 text-center ">
                <span className="text-4xl font-bold">$19</span>/ month
              </div>
              <ul className="mt-4 space-y-2 ">
                <li className="flex items-center ">
                  <svg
                    className=" text-white text-2xs bg-green-500 rounded-full mr-2 p-1"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  1080p Video Rendering
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Add Custom Music
                </li>
                <li className="flex items-center">
                  <svg
                    className=" text-white text-xs bg-green-500 rounded-full mr-2 p-1"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Premium Support
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                disabled={loading === 2}
                onClick={async () => {
                  setLoading(2);
                  await handleCreatePaymentSession(
                    lemonDets[
                      process.env.NODE_ENV === "development" ? "test" : "live"
                    ].monthlyProductId
                  );
                  setLoading(0);
                }}
              >
                {loading === 2 && (
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                )}
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
