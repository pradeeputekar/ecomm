"use client";
import { useSession } from "next-auth/react";
import AddProduct from "@/components/AddProduct";

const Admin = () => {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.admin;
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !isAdmin) {
    return <p>You are not authorized to access this page.</p>;
  }

  return (
    <>
      <AddProduct />
    </>
  );
};

export default Admin;
