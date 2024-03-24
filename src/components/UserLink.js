"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

const UserLink = ({ vertical, onCloseMenu }) => {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.admin;
  const userName = session?.user?.name;

  const handleSignOut = async () => {
    await signOut();
    vertical
      ? toast.success("LogOut Successfully", { onClose: handleLinkClick })
      : toast.success("LogOut Successfully");
  };

  const handleLinkClick = () => {
    onCloseMenu();
  };
  return (
    <>
      {status === "authenticated" ? (
        <div
          className={
            vertical
              ? "flex flex-col items-center justify-center"
              : "flex flex-row items-center justify-center"
          }
        >
          {isAdmin && (
            <Link
              onClick={vertical ? handleLinkClick : undefined}
              href="/admin"
            >
              Dashboard
            </Link>
          )}

          <button
            className={vertical ? "mt-4" : "ml-4"}
            onClick={handleSignOut}
          >
            Logout ({userName})
          </button>
        </div>
      ) : (
        <Link onClick={vertical ? handleLinkClick : undefined} href="/login">
          Login
        </Link>
      )}
    </>
  );
};

export default UserLink;
