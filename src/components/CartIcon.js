"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
  const bag = useSelector((store) => store.bag);
  return (
    <>
      <div className="relative">
        <Link href="/cart">
          <FaShoppingCart className="w-8 h-8 text-gray-600" />
          <span className="absolute bottom-5 left-5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {bag.length}
          </span>
        </Link>
      </div>
    </>
  );
};

export default CartIcon;
