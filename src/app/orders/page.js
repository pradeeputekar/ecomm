"use client";
import Loader from "@/components/Loader";
import OrderList from "@/components/OrderList";
import { useSession } from "next-auth/react";

const Orders = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-50 p-4 lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        Please Login to view your order details.
      </div>
    );
  }

  return (
    <>
      <OrderList />
    </>
  );
};

export default Orders;
