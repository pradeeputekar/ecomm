import React from "react";
import Menu from "@/components/Menu";
import UserLink from "@/components/UserLink";
import Link from "next/link";
import CartIcon from "@/components/CartIcon";
import { FaShopify } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-16 md:h-16 sticky top-0 lg:px-4 xl:px-8 bg-black text-red-500 flex justify-between items-center ">
      <div className="flex items-center">
        <Link className="mx-4 flex justify-between" href="/">
          <FaShopify size={20} /> <span>ShopCart</span>
        </Link>
        <div className="hidden md:flex justify-between gap-2">
          <Link href="/">Home</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/about">About</Link>
          <UserLink vertical={false} />
        </div>
        <div className="hidden md:flex justify-between gap-2">
          <CartIcon />
        </div>
      </div>
      <div className="flex md:hidden justify-between gap-4">
        <CartIcon />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
