"use client";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bagActions } from "@/store/slices/bagSlice";
import { toast } from "react-toastify";

import axios from "axios";
import { useSession } from "next-auth/react";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();

  const isAdmin = session?.user?.admin;

  const dispatch = useDispatch();

  const deleteProduct = async (e) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        "/api/products/" + e.replace("ShopCart/", "")
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddToBag = () => {
    dispatch(
      bagActions.updateQuantity({
        productId: product._id,
        quantity: quantity,
      })
    );
    toast.success("Added to cart successfully");
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-2 gap-2">
      <Image
        src={product.image_url}
        alt="image"
        width="300"
        height="350"
        className="w-full object-cover rounded-md"
      />

      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p className="text-gray-600 h-24 overflow-hidden line-clamp-4">
        {product.description}
      </p>

      <div className="flex justify-between">
        <span className="text-red-500 items-center py-2 font-semibold">
          ₹{product.price.toFixed(2)}
        </span>

        <div className="flex gap-2 justify-between items-center border-2 border-solid border-red-500">
          <button
            className="bg-red-500 text-white px-2 py-1.5"
            onClick={() => {
              setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
            }}
          >
            -
          </button>
          <span className="p-1.5">{quantity}</span>
          <button
            className="bg-red-500 text-white px-2 py-1.5"
            onClick={() => {
              setQuantity((prev) => (prev < 20 ? prev + 1 : 20));
            }}
          >
            +
          </button>
        </div>
      </div>
      {isAdmin ? (
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => deleteProduct(product.public_id)}
        >
          {loading ? "Processing..." : "Delete Product"}
        </button>
      ) : null}

      <button
        type="button"
        className="bg-green-600 text-white rounded-md p-2"
        onClick={handleAddToBag}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
