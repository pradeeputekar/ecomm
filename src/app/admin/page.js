"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import AddProduct from "@/components/AddProduct";
import Loader from "@/components/Loader";
import ManageProduct from "@/components/ManageProduct";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.admin;

  useEffect(() => {
    if (status === "authenticated" && isAdmin) {
      fetchData();
    }
  }, [status, isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
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
        <AddProduct fetchData={fetchData} />
        <ManageProduct
          products={products}
          fetchData={fetchData}
          fetchLoading={loading}
        />
      </div>
    </>
  );
};

export default Admin;
