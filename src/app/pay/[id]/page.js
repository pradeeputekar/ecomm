"use client";

import CheckOutForm from "@/components/CheckOutForm";
import Loader from "@/components/Loader";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const PayPage = ({ params }) => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = params;

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await fetch(`/api/create-intent/${id}`, {
          method: "POST",
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [id]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && stripePromise ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm orderId={id} />
        </Elements>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PayPage;
