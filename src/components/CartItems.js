import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { bagActions } from "@/store/slices/bagSlice";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

function CartItems({ item }) {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(bagActions.removeFromBag(item._id));
    toast.success("remove from cart successfully");
  };

  const totalPrice = item.price * item.quantity;

  return (
    <>
      <div className="flex items-center justify-between my-2">
        <div>
          <Image src={item.image_url} alt="" width={100} height={500} />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">{item.title}</h1>

          <span className="text-red-500 font-semibold">
            ₹{item.price.toFixed(2)} X {item.quantity} Qty
          </span>

          <div>Total Price : ₹{totalPrice} </div>
        </div>
        <span className="cursor-pointer" onClick={handleRemoveItem}>
          <MdClose size={30} />
        </span>
      </div>
    </>
  );
}

export default CartItems;
