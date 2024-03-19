"use client";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { itemsActions } from "@/store/slices/itemSlice";
import Loader from "@/components/Loader";

const FetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const modifiedData = data.map((item) => ({ ...item }));
        setProducts(modifiedData);
        dispatch(itemsActions.addInitialItems(modifiedData));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-2">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FetchProducts;
