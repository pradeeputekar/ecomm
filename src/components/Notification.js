import React from "react";
import Link from "next/link";

function Notification() {
  return (
    <div className="bg-red-500 text-white text-center py-3 font-bold">
      Newcomers, please visit the{" "}
      <Link className="text-blue-900" href={"/about"}>
        About
      </Link>{" "}
      section first.
    </div>
  );
}

export default Notification;
