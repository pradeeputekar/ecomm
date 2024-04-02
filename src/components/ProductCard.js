"use client";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bagActions } from "@/store/slices/bagSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

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
        width={300}
        height={200}
        className="w-full h-40 object-contain rounded-md overflow-hidden"
      />

      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p className="text-gray-600 h-24 overflow-hidden line-clamp-4">
        {product.description}
      </p>
      {product.stock_qty === 0 ? (
        <span className="text-red-500">
          Sorry, this item is currently out of stock, please check back later.
        </span>
      ) : (
        <span className="text-green-500">
          {product.stock_qty} Qty left in stock
        </span>
      )}
      {product.stock_qty === 0 ? null : (
        <div className="flex justify-between">
          <span className="text-red-500 items-center py-2 font-semibold">
            ₹{product.price.toFixed()}
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
                setQuantity((prev) =>
                  prev < product.stock_qty ? prev + 1 : product.stock_qty
                );
              }}
            >
              +
            </button>
          </div>
        </div>
      )}

      {product.stock_qty === 0 ? null : (
        <button
          type="button"
          className="rounded-md p-2 text-white bg-green-600"
          onClick={handleAddToBag}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
