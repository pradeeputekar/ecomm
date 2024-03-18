"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const payment_intent = searchParams.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`/api/confirm/${payment_intent}/${orderId}`, {
          method: "PUT",
        });
        setTimeout(() => {
          router.push("/orders");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [payment_intent, router, orderId]);

  return (
    <>
      <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
        <p className="max-w-[600px]">
          Payment successful. You are being redirected to the orders page.
          Please do not close the page.
        </p>
        <ConfettiExplosion className="absolute m-auto" />
      </div>
    </>
  );
}

export default function Success() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <SuccessPage />
    </Suspense>
  );
}
