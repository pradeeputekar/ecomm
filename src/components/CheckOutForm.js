import React from "react";
import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { AddressElement } from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm({ orderId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !address) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const formData = new FormData();

    for (const key in address) {
      formData.append(key, address[key]);
    }

    try {
      await axios.put(`/api/orders/${orderId}`, formData);
    } catch (error) {
      console.log("Address save error", error);
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `https://shopcart-ecomm.vercel.app/success?orderId=${orderId}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("500, Internal Server Error.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <div className="p-4 lg:px-20 xl:px-40 flex justify-between">
        <h2 className="text-green-700 font-bold">Payment Details</h2>
        <span className="text-red-500">note: please use demo details</span>
      </div>
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] p-4 lg:px-20 xl:px-40 flex flex-col gap-8"
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <AddressElement
          options={{ mode: "shipping" }}
          onChange={(event) => {
            if (event.complete) {
              setAddress(event.value.address);
            }
          }}
        />
        <button
          disabled={isLoading || !address || !stripe || !elements}
          id="submit"
          className="bg-red-500 text-white p-4 rounded-md w-28"
        >
          {isLoading ? "Processing..." : "Pay now"}
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </>
  );
}
