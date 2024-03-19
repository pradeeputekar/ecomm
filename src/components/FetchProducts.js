"use client";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { itemsActions } from "@/store/slices/itemSlice";
import Loader from "@/components/Loader";

function FetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/products", {
        cache: "no-store",
      })
      .then((response) => {
        const modifiedData = response.data.map((item) => ({
          ...item,
        }));
        setProducts(modifiedData);
        dispatch(itemsActions.addInitialItems(modifiedData));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
}

export default FetchProducts;
