"use client";

import React, { useState } from "react";
import Link from "next/link";
import UserLink from "@/components/UserLink";
import { MdMenuOpen, MdClose } from "react-icons/md";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Orders", url: "/orders" },
  { id: 3, title: "About", url: "/about" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <div>
      {open ? (
        <MdClose
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
          size={40} // Set the size of the icon
        />
      ) : (
        <MdMenuOpen
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
          size={40} // Set the size of the icon
        />
      )}
      {open && (
        <div className="bg-blue-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-3xl z-10">
          {links.map((item) => (
            <Link href={item.url} key={item.id} onClick={handleCloseMenu}>
              {item.title}
            </Link>
          ))}
          <UserLink vertical={true} onCloseMenu={handleCloseMenu} />
        </div>
      )}
    </div>
  );
};

export default Menu;
