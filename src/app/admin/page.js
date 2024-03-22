"use client";
import { useSession } from "next-auth/react";
import AddProduct from "@/components/AddProduct";
import Loader from "@/components/Loader";
import ManageProduct from "@/components/ManageProduct";

const Admin = () => {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.admin;
  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated" || !isAdmin) {
    return <p>You are not authorized to access this page.</p>;
  }

  return (
    <>
      <div className="p-2 font-bold text-xl text-center text-red-700">
        Welcome to Admin Dashboard
      </div>
      <div className="p-4 text-red-500">
        <AddProduct />
        <ManageProduct />
      </div>
    </>
  );
};

export default Admin;
